import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { contract as rifaContract } from '../../rifas/interfaces/contract';

@injectable()
export class VerificarRifa {
    constructor(
        @inject('Rifa')
        private rifaRepository: rifaContract,
    ) {}

    async execute(rifaId: string): Promise<void> {

        const rifa = await this.rifaRepository.findById(rifaId)

        if (!rifa) {
            throw new AppError("Rifa não encontrada")
        }

        if(rifa.client[0] != null) {
            throw new AppError(`A rifa nº ${rifa.number} foi reservada. Se o pagamento não for realizado em até 2 minutos, ela será disponibilizada.`)
        }
        
    }
}