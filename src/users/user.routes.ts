import { Router } from 'express';
import { createUser } from './user.controller';

const router = Router();

router.post('/', createUser); // Endpoint de creación de usuario

export default router;
