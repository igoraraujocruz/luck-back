
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAll } from '../services/GetAll';
import { Create } from '../services/Create';
import slugify from 'slugify';
import { GetBySlug } from '../services/GetBySlug';

export class Controller {
    async get(request: Request, response: Response): Promise<Response> {

        const { productSlug } = request.query;

        if (productSlug) {
            const get = container.resolve(GetBySlug);

            const product = await get.execute(String(productSlug));

            return response.json(instanceToPlain(product));
        }

        const getAll = container.resolve(GetAll)

        const item = await getAll.execute()

        return response.status(200).json(instanceToPlain(item))
    }

    async create(request: Request, response: Response): Promise<Response> {

        const { name, price, imgSrc, videoSrc, description, luckDay, quantidadeDeRifas } = request.body

        const image = request.file?.filename ? request.file?.filename : 'SEM IMG'

        const create = container.resolve(Create)

        const item = await create.execute({name, price, imgSrc: image, slug: slugify(name, {
            lower: true,
        }), videoSrc, description, luckDay, quantidadeDeRifas})

        return response.status(200).json(instanceToPlain(item))
    }
}