import { inject, injectable } from 'tsyringe';
import { RifaClient } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';

@injectable()
export class Create {
    constructor(
        @inject('RifaClient')
        private repository: contract,
    ) {}

    async execute({
        rifaId,
        clientId   
    }: create): Promise<RifaClient> {

        const item = await this.repository.create({rifaId, clientId});

        return item
    }
}