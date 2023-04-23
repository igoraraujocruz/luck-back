import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { Rifa } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<Rifa>;

    constructor() {
        this.ormRepository = getRepository(Rifa);
    }

    async create({ number, productId }: create): Promise<Rifa> {
        const item = this.ormRepository.create({ number, productId });

        await this.ormRepository.save(item);

        return item;
    }

    async getAll(): Promise<Rifa[]> {
        const item = await this.ormRepository.find({
            order: {
                number: 'ASC'
            }
        })

        return item;
    }

    async findById(rifa: string): Promise<Rifa | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                id: rifa
            }
        });

        return item;
    }

    async save(item: Rifa): Promise<Rifa> {
        return this.ormRepository.save(item);
    }
}