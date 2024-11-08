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

// Reservar un libro
export const reserveBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, userId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }

        if (!book.available) {
            res.status(400).json({ message: 'Libro no disponible para reserva' });
            return;
        }

        book.reservations.push({ userId, reservationDate: new Date() });
        book.available = false; // Asumimos que solo se puede reservar una copia a la vez

        await book.save();
        res.status(200).json({ message: 'Libro reservado exitosamente', book });
    } catch (error) {
        res.status(500).json({ message: 'Error al reservar el libro', error });
    }
};

// Devolver un libro (marcar la fecha de devolución)
export const returnBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, userId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }

        const reservation = book.reservations.find(
            (res) => res.userId.toString() === userId && !res.returnDate
        );

        if (!reservation) {
            res.status(400).json({ message: 'No se encontró una reserva activa para este usuario' });
            return;
        }

        reservation.returnDate = new Date();
        book.available = true; // El libro vuelve a estar disponible

        await book.save();
        res.status(200).json({ message: 'Libro devuelto exitosamente', book });
    } catch (error) {
        res.status(500).json({ message: 'Error al devolver el libro', error });
    }
};
