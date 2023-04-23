import { inject, injectable } from 'tsyringe';
import { RifasClients } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class GetAll {
    constructor(
        @inject('RifasClients')
        private repository: contract,
    ) {}

    async execute(): Promise<RifasClients[]> {

        const item = await this.repository.getAll();

        return item;
    }
}