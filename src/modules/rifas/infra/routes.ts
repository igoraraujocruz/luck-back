import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';
import { ensureAuthenticated } from '../../users/infra/ensureAuthenticated'

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)

router.patch('/:rifaId',
ensureAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        rifaId: Joi.string().required(),
    }, 
}),
controller.updateisPaid)

router.post('/gerencianet/webhook(/pix)?', celebrate({
    [Segments.BODY]: {
        pix: Joi.array().required(),
    }, 
}), controller.paymentPaid)

