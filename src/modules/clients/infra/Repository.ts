import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { Client } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<Client>;

    constructor() {
        this.ormRepository = getRepository(Client);
    }

    async create({ name, numberPhone, rifaId }: create): Promise<Client> {

        const item = this.ormRepository.create({ name, numberPhone, rifaId });

        await this.ormRepository.save(item);

        return item;
    }

    async findById(clientId: string): Promise<Client | undefined> {
        const item = await this.ormRepository.findOne({
            where: {
                id: clientId
            }
        });

        return item;
    }

    async save(item: Client): Promise<Client> {
        return this.ormRepository.save(item);
    }
}