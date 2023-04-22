import { contract } from "../interfaces/contract";
import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { RifasClients } from "./Entity";

export class Repository implements contract {
    private ormRepository: TypeormRepository<RifasClients>;

    constructor() {
        this.ormRepository = getRepository(RifasClients);
    }

    async create(rifaId: string, clientId: string): Promise<RifasClients> {
        const item = this.ormRepository.create({ rifaId, clientId })

        await this.ormRepository.save(item)

        return item;
    }

    async findByClientId(clientId: string): Promise<RifasClients | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                clientId: clientId
            }
        });

        return item;
    }


    async findByRifaId(rifaId: string): Promise<RifasClients | undefined> {

        const item = await this.ormRepository.findOne({
            where: {
                id: rifaId
            }
        });

        return item;
    }

}