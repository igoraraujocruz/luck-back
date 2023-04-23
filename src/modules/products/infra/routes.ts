import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)
router.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            imgSrc: Joi.string().required(),
            videoSrc: Joi.string().required(),
            description: Joi.string().required(),
            luckDay: Joi.date().required(),
            quantidadeDeRifas: Joi.number().required(),
        },
    }),
    controller.create,
);

