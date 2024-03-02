import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Product } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { contract as rifaContract } from '../../rifas/interfaces/contract';
import { create } from '../interfaces/create';

@injectable()
export class Create {
    constructor(
        @inject('Product')
        private repository: contract,
        @inject('Rifa')
        private rifaRepository: rifaContract,
        @inject('Storage')
        private storage: storageContract,
    ) {}

    async execute({
        name,description,imgSrc,luckDay,
        price,quantidadeDeRifas,videoSrc, slug  
    }: create): Promise<Product> {

        const item = await this.repository.create({name, description, imgSrc, 
            luckDay, price, quantidadeDeRifas, videoSrc, slug});

            await this.storage.saveFile(imgSrc);

            for(let i=0; i < quantidadeDeRifas; i++) {
                await this.rifaRepository.create({number: i, productId: item.id})
            }

        return item
    }
}