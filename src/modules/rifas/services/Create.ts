import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';

@injectable()
export class Create {
    constructor(
        @inject('Rifa')
        private repository: contract,
    ) {}

    async execute({
        number   
    }: create): Promise<Rifa> {

        const item = await this.repository.create({number});

        return item
    }
}