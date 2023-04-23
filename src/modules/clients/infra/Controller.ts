import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Create } from '../services/Create';
import { VerificarRifa } from '../services/VerificarRifa';
import { gerarPix } from '../services/gerarPix';
import { GetById } from '../../products/services/GetById';


export class Controller {
    async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, rifas, numberPhone, productId } =
            request.body;

        const numberPhoneFormated = numberPhone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')

        const verify = container.resolve(VerificarRifa);
        const create = container.resolve(Create);
        const getProductById = container.resolve(GetById);


        for(const rifa of rifas) {
            await verify.execute(rifa);
        }

        var contador = 0

        for(const rifa of rifas) {
            await create.execute(
                {
                    name, numberPhone: numberPhoneFormated, rifaId: rifa,
                }
            );

            contador++
        }

        const product = await getProductById.execute(productId)

        if(!product) {
            throw new Error('Produto não encontrado.')
        }

        const valorTotalAPagar = contador * product.price

        const { qrcode } = await gerarPix(valorTotalAPagar, 'igor')

        return response.status(201).json(qrcode.data);
    }
}