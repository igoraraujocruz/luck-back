import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)

router.post('/gerencianet/webhook(/pix)?', celebrate({
    [Segments.BODY]: {
        pix: Joi.array().required(),
    }, 
}), controller.paymentPaid)

