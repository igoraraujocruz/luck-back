import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { RifasClients } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<RifasClients>;

    constructor() {
        this.ormRepository = getRepository(RifasClients);
    }

    async create({ rifaId, clientId, txid }: create): Promise<RifasClients> {
        const item = this.ormRepository.create({ rifaId, clientId, txid });

        await this.ormRepository.save(item);

        return item;
    }

    async getAll(): Promise<RifasClients[]> {
        const item = await this.ormRepository.find()

        return item;
    }

    async findById(clientId: string): Promise<RifasClients | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                clientId: clientId
            }
        });

        return item;
    }

    async findAllByClientId(clientId: string): Promise<RifasClients[]> {

        const item = await this.ormRepository.find({
            where: {
                clientId: clientId
            }
        });

        return item;
    }

    async findByTxId(txId: string): Promise<RifasClients[]> {

        const item = await this.ormRepository.find({
            where: {
                txid: txId
            }
        });

        return item;
    }

    
    async remove(rifaId: string): Promise<void | undefined> {
       await this.ormRepository.delete({
            rifaId: rifaId
        });
    }

    async save(item: RifasClients): Promise<RifasClients> {
        return this.ormRepository.save(item);
    }
}