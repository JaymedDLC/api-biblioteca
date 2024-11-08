import { Request, Response } from 'express';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Crear un nuevo usuario (Create)
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Leer un usuario (Read) para login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ message: 'Credenciales inválidas' });
            return;
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY || 'secret', {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Actualizar un usuario (Update)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Inhabilitar un usuario (Delete con soft delete)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        user.active = true;
        await user.save();
        res.status(200).json({ message: 'Usuario inhabilitado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al inhabilitar el usuario', error });
    }
};
