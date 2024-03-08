import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class UpdateIsActivate {
    constructor(
        @inject('Product')
        private repository: contract,
    ) {}

    async execute(productId: string): Promise<Product> {

        const item = await this.repository.findById(productId);

        if(!item) {
            throw new AppError("Produto não encontrado")
        }

        item.isActivate = !item.isActivate

        await this.repository.save(item)

        return item
    }
}