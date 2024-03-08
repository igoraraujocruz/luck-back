import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { Controller } from '../../rifasClients/infra/Controller';
import { ensureAuthenticated } from '../../users/infra/ensureAuthenticated';

export const router = Router();
const controller = new Controller();

router.delete('/', 
ensureAuthenticated,
celebrate({
    [Segments.BODY]: {
        clientId: Joi.string().uuid().required(),
    }, 
}), controller.removeClient)

