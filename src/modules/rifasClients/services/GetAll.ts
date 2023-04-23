import { inject, injectable } from 'tsyringe';
import { RifaClient } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class GetAll {
    constructor(
        @inject('RifaClient')
        private repository: contract,
    ) {}

    async execute(): Promise<RifaClient[]> {

        const item = await this.repository.getAll();

        return item;
    }
}