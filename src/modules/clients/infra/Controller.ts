import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Create } from '../services/Create';
import { gerarPix } from '../services/gerarPix';


export class Controller {
    async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, rifas, numberPhone } =
            request.body;

        const numberPhoneFormated = numberPhone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

        const create = container.resolve(Create);

        const item =  await create.execute(
            {
                name, numberPhone: numberPhoneFormated, rifas,
            }
        );

        const { qrcode } = await gerarPix(2, 'igor')

        return response.status(201).json(qrcode.data);
    }
}