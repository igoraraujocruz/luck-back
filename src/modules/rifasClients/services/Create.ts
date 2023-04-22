import { contract } from "../interfaces/contract";
import { inject } from "tsyringe";
import { RifasClients } from "../infra/Entity";

export class Create {
    constructor(
        @inject('RifasClients')
        private repository: contract,
    ) {}

    async execute(rifaId: string, clientId: string): Promise<RifasClients> {

        const item = await this.repository.create(rifaId, clientId);

        return item;
        
    }
}