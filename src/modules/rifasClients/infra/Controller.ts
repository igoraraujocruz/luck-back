
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAll } from '../services/GetAll';
import { Create } from '../services/Create';

export class Controller {
    async getAll(request: Request, response: Response): Promise<Response> {
        const getAll = container.resolve(GetAll)

        const item = await getAll.execute()

        return response.status(200).json(instanceToPlain(item))
    }

    async create(request: Request, response: Response): Promise<Response> {

        const { rifaId, clientId } = request.body

        const create = container.resolve(Create)

        const item = await create.execute({rifaId, clientId})

        return response.status(200).json(instanceToPlain(item))
    }
}