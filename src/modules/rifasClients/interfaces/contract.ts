import { RifaClient } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ rifaId, clientId }: create): Promise<RifaClient>;
    getAll(): Promise<RifaClient[]>;
    save(rifaClient: RifaClient): Promise<RifaClient>;
    findById(rifaClientId: string): Promise<RifaClient | undefined>;
}