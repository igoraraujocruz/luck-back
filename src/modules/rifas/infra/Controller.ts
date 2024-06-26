
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAll } from '../services/GetAll';
import { PaymentPaid } from '../services/PaymentPaid';
import { UpdateRifaIsPaid } from '../services/UpdateRifaIsPaid';

export class Controller {
    async getAll(request: Request, response: Response): Promise<Response> {
        const getAll = container.resolve(GetAll)

        const item = await getAll.execute()

        return response.status(200).json(instanceToPlain(item))
    }

    async paymentPaid(request: Request, response: Response): Promise<Response> {

        const { txid } = request.body.pix[0]

        const paymentPaid = container.resolve(PaymentPaid)

        const item = await paymentPaid.execute(txid)

        return response.status(200).json(instanceToPlain(item))
    }

    async updateisPaid(request: Request, response: Response): Promise<Response> {

        const { rifaId } = request.params

        const update = container.resolve(UpdateRifaIsPaid)

        const item = await update.execute(rifaId)

        return response.status(200).json(instanceToPlain(item))
    }
}