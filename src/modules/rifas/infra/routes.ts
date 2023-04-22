import { Router } from 'express';
import { Controller } from './Controller';

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)

