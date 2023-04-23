import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { RifaClient } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<RifaClient>;

    constructor() {
        this.ormRepository = getRepository(RifaClient);
    }

    async create({ rifaId, clientId }: create): Promise<RifaClient> {
        const item = this.ormRepository.create({ rifaId, clientId });

        await this.ormRepository.save(item);

        return item;
    }

    async getAll(): Promise<RifaClient[]> {
        const item = await this.ormRepository.find()

        return item;
    }

    async findById(rifaClientId: string): Promise<RifaClient | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                id: rifaClientId
            }
        });

        return item;
    }

    async save(item: RifaClient): Promise<RifaClient> {
        return this.ormRepository.save(item);
    }
}