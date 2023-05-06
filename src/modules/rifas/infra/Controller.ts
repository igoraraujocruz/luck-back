
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAll } from '../services/GetAll';
import { PaymentPaid } from '../services/PaymentPaid';
import { RemoveClient } from '../services/RemoveClient';

export class Controller {
    async getAll(request: Request, response: Response): Promise<Response> {
        const getAll = container.resolve(GetAll)

        const item = await getAll.execute()

        return response.status(200).json(instanceToPlain(item))
    }

    async paymentPaid(request: Request, response: Response): Promise<Response> {

        const { clientId } = request.body;

        const paymentPaid = container.resolve(PaymentPaid)

        const item = await paymentPaid.execute(clientId)

        return response.status(200).json(instanceToPlain(item))
    }
}