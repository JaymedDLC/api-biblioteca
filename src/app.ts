import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './users/user.routes';
import bookRoutes from './books/book.routes';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
