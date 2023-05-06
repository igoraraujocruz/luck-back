import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';
import { io } from '../../../shared/http';

@injectable()
export class PaymentPaid {
    constructor(
        @inject('Rifa')
        private repository: contract,
    ) {}

    async execute(clientId: string): Promise<Rifa[] | undefined> {

        const rifas = await this.repository.findByClientId(clientId);

        rifas?.forEach(async rifa => {
            rifa.isPaid = true
            await this.repository.save(rifa)
        })

        io.emit("updateRifas")

        return rifas
    }
}