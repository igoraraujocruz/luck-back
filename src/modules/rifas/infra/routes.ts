import { Router } from 'express';
import { Controller } from './Controller';
import { Joi, Segments, celebrate } from 'celebrate';

export const router = Router();
const controller = new Controller();

router.get('/', controller.getAll)

router.post('/gerencianet/webhook(/pix)?', (req, res) => {
    console.log(req.body);
    res.send('200');
})


// router.put('/', celebrate({
//     [Segments.BODY]: {
//         clientId: Joi.string().uuid().required(),
//     }, 
// }), controller.paymentPaid)

