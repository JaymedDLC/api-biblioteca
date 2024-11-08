import User, { IUser } from './user.model';

// Verifica si un usuario tiene permisos administrativos.

export const isAdmin = async (userId: string): Promise<boolean> => {
    const user = await User.findById(userId);
    return user ? user.role === 'admin' : false;
};


// Busca un usuario por su correo electrónico.
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
};
