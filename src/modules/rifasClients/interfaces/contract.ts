import { RifasClients } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ rifaId, clientId }: create): Promise<RifasClients>;
    getAll(): Promise<RifasClients[]>;
    save(rifaClient: RifasClients): Promise<RifasClients>;
    findById(rifaClientId: string): Promise<RifasClients | undefined>;
    findByTxId(txId: string): Promise<RifasClients[]>;
    remove(rifaId: string): Promise<void | undefined>;
}