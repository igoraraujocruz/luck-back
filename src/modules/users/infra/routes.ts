import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { Controller } from './Controller';
import { ensureAuthenticated } from './ensureAuthenticated';

export const router = Router();
const controller = new Controller();

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required().min(6),
        },
    }),
    controller.create,
);

router.post(
    '/auth',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required().min(6),
        },
    }),
    controller.auth,
);