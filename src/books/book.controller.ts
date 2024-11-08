import { Request, Response } from 'express';
import Book from './book.model';

// Crear un nuevo libro
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: 'Libro creado exitosamente', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro', error });
    }
};

// Leer libros con filtros y solo activos
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters = req.query;
        const books = await Book.find({ ...filters, active: true });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar los libros', error });
    }
};

// Actualizar un libro
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Libro actualizado exitosamente', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
};

// Inhabilitar un libro (soft delete)
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
        book.active = false;
        await book.save();
        res.status(200).json({ message: 'Libro inhabilitado exitosamente', book });
    } catch (error) {
        res.status(500).json({ message: 'Error al inhabilitar el libro', error });
    }
};
