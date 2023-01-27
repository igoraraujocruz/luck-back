import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { Controller } from './Controller';
import { ensureAuthenticated } from '../../sellers/infra/Middlewarer';
import { ensureSellerIsAdmin } from '../../shop/infra/Middlewarer';

export const router = Router();
const controller = new Controller();

router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            quantity: Joi.number().required(),
            productId: Joi.string().uuid().required(),
            shopId: Joi.string().uuid().required(),
        },
    }),
    controller.create,
);

router.get('/',
celebrate({
    [Segments.QUERY]: {
        shopId: Joi.string().uuid(),
    },
}), ensureAuthenticated, ensureSellerIsAdmin,
controller.getAll)