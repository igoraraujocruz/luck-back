import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class GetById {
    constructor(
        @inject('Product')
        private repository: contract,
    ) {}

    async execute(productId: string): Promise<Product | undefined> {

        const item = await this.repository.findById(productId);

        return item;
    }
}