import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class GetAll {
    constructor(
        @inject('Rifa')
        private repository: contract,
    ) {}

    async execute(): Promise<Rifa[]> {

        const item = await this.repository.getAll();

        return item;
    }
}