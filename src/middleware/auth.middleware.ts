import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: string | object;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token no válido' });
    }
};
