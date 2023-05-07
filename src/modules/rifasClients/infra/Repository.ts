import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { RifasClients } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<RifasClients>;

    constructor() {
        this.ormRepository = getRepository(RifasClients);
    }

    async create({ rifaId, clientId }: create): Promise<RifasClients> {
        const item = this.ormRepository.create({ rifaId, clientId });

        await this.ormRepository.save(item);

        return item;
    }

    async getAll(): Promise<RifasClients[]> {
        const item = await this.ormRepository.find()

        return item;
    }

    async findById(rifaClientId: string): Promise<RifasClients | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                id: rifaClientId
            }
        });

        return item;
    }

    
    async remove(clientId: string): Promise<void | undefined> {
        await this.ormRepository.delete({
            clientId: clientId
        });
    }

    async save(item: RifasClients): Promise<RifasClients> {
        return this.ormRepository.save(item);
    }
}