import { RifasClients } from "../infra/Entity";

export interface contract {
    create(rifaId: string, clientId: string): Promise<RifasClients>
    findByClientId(clientId: string): Promise<RifasClients | undefined>
    findByRifaId(rifaId: string): Promise<RifasClients | undefined>
}