import { inject, injectable } from 'tsyringe';
import { contract } from '../interfaces/contract';
import { Product } from '../infra/Entity';
import { AppError } from '../../../shared/AppError';

@injectable()
export class GetBySlug{
    constructor(
        @inject('Product')
        private repository: contract,
    ) {}

    async execute(productSlug: string): Promise<Product | undefined> {
        const item = await this.repository.findBySlug(productSlug);

        if(!item) {
            throw new AppError("Produto não encontrado")
        }

        return item;
    }
}