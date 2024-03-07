import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Create } from '../services/Create';
import { instanceToPlain } from 'class-transformer';

export class Controller {
    async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { username, password } =
            request.body;

        const create = container.resolve(Create);

        const item = await create.execute({
            username, password
        });

        return response.status(200).json(instanceToPlain(item));
    }
}