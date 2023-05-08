import { inject, injectable } from 'tsyringe';
import { RifasClients } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';


@injectable()
export class Create {
    constructor(
        @inject('RifasClients')
        private repository: contract,
    ) {}

    async execute({
        rifaId,
        clientId,
        txid 
    }: create): Promise<RifasClients> {

        const item = await this.repository.create({rifaId, clientId, txid});

        return item
    }
}