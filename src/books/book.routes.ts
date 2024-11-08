import { Router } from 'express';
import { createBook, reserveBook, returnBook } from './book.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, createBook); // Crear un libro
router.post('/reserve', verifyToken, reserveBook); // Reservar un libro
router.post('/return', verifyToken, returnBook); // Devolver un libro

export default router;
