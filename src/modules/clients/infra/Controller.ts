import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Create } from '../services/Create';
import { VerificarRifa } from '../services/VerificarRifa';
import { gerarPix } from '../services/gerarPix';
import { GetById } from '../../products/services/GetById';
import { Create as CreateRifaClient } from '../../rifasClients/services/Create';
import { io } from '../../../shared/http';


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
        const createRifaClient = container.resolve(CreateRifaClient)

        for(const rifa of rifas) {
            await verify.execute(rifa);
        }

        const client = await create.execute({ name, numberPhone: numberPhoneFormated })

        const product = await getProductById.execute(productId)

        if(!product) {
            throw new Error('Produto não encontrado.')
        }

        const valorTotalAPagar = rifas.length * product.price

        const { qrcode, cobranca } = await gerarPix(valorTotalAPagar, client.id)

        for(const rifa of rifas) {

            await createRifaClient.execute({clientId: client.id, rifaId: rifa, txid: cobranca.data.txid})
        }

        io.to(product.slug).emit("updateRifas")

        return response.status(201).json(qrcode.data);
    }
}