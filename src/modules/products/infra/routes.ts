import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';
import uploadConfig from '../../../config/upload';
import multer from 'multer';
import { ensureAuthenticated } from '../../users/infra/ensureAuthenticated';

export const router = Router();
const controller = new Controller();
const upload = multer(uploadConfig.multer);

router.get('/', celebrate({
    [Segments.QUERY]: {
        productSlug: Joi.string(),
    },
}), controller.get)


router.post(
'/',
ensureAuthenticated,
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

router.patch('/:productId', 
ensureAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        productId: Joi.string().uuid().required(),
    },
}), controller.updateIsActivate)


