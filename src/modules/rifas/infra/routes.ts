import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)

router.put('/', celebrate({
    [Segments.BODY]: {
        clientId: Joi.string().uuid().required(),
    }, 
}), controller.paymentPaid)

