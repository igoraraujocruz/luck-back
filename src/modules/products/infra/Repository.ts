import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { Product } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    async create({ name,description,imgSrc,luckDay,price,quantidadeDeRifas,videoSrc }: create): Promise<Product> {
        const item = this.ormRepository.create({ name,description,imgSrc,luckDay,price,quantidadeDeRifas,videoSrc, rifasRestantes: quantidadeDeRifas });

        await this.ormRepository.save(item);

        return item;
    }

    async getAll(): Promise<Product[]> {
        const item = await this.ormRepository.find()

        return item;
    }

    async findById(rifa: string): Promise<Product | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                id: rifa
            }
        });

        return item;
    }

    async save(item: Product): Promise<Product> {
        return this.ormRepository.save(item);
    }
}