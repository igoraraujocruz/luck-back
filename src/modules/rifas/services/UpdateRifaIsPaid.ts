import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';


@injectable()
export class UpdateRifaIsPaid {
    constructor(
        @inject('Rifa')
        private repository: contract,
    ) {}

    async execute(rifaId: string) {

        const rifa = await this.repository.findById(rifaId)

        if(!rifa) {
            throw new AppError('Rifa não encontrada')
        }

        rifa.isPaid = false

        await this.repository.save(rifa)
    }
}