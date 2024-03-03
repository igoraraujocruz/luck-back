import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';

@injectable()
export class FindById {
    constructor(
        @inject('Rifa')
        private repository: contract,
    ) {}

    async execute(rifaId: string): Promise<Rifa | undefined> {

        const item = await this.repository.findById(rifaId);

        return item;
    }
}