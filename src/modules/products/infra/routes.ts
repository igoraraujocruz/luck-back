import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';
import uploadConfig from '../../../config/upload';
import multer from 'multer';

export const router = Router();
const controller = new Controller();
const upload = multer(uploadConfig.multer);

router.get('/', celebrate({
    [Segments.QUERY]: {
        productSlug: Joi.string(),
    },
}), controller.get)


if(process.env.ROUTE_OFF !== 'true') {
    router.post(
        '/',
        upload.single('imgSrc'),
        celebrate({
            [Segments.BODY]: {
                name: Joi.string().required(),
                price: Joi.number().required(),
                videoSrc: Joi.string().required(),
                description: Joi.string().required().max(240),
                luckDay: Joi.date().required(),
                quantidadeDeRifas: Joi.number().required(),
            },
        }),
        controller.create,
    );
    
}

router.patch('/:productId', celebrate({
    [Segments.PARAMS]: {
        productId: Joi.string().uuid().required(),
    },
}), controller.updateIsActivate)


