import { Router } from 'express';
import {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    reserveBook,
    returnBook
} from './book.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, createBook); // Crear un libro
router.get('/', verifyToken, getBooks); // Leer libros con filtros
router.put('/:id', verifyToken, updateBook); // Actualizar un libro
router.delete('/:id', verifyToken, deleteBook); // Soft delete de un libro

router.post('/reserve', verifyToken, reserveBook); // Reservar un libro
router.post('/return', verifyToken, returnBook); // Devolver un libro

export default router;
