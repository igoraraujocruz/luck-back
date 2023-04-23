import { Client } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ name, numberPhone,  rifaId}: create): Promise<Client>;
    findById(clientId: string): Promise<Client | undefined>;
    save(user: Client): Promise<Client>;
}