import Book, { IBook } from './book.model';

// Verifica si un libro está disponible.
export const isBookAvailable = async (bookId: string): Promise<boolean> => {
    const book = await Book.findById(bookId);
    return book ? book.available : false;
};


// Marca un libro como reservado.
export const reserveBookAction = async (bookId: string, userId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId);
    if (book && book.available) {
        book.reservations.push({ userId, reservationDate: new Date() });
        book.available = false;
        await book.save();
        return book;
    }
    return null;
};
