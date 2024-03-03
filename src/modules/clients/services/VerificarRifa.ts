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
            throw new AppError("Nº não encontrado")
        }

        if(rifa.client[0] != null) {
            throw new AppError(`O nº ${rifa.number} foi reservado. Se o pagamento não for realizado em até ${process.env.GN_TEMPO_DE_VALIDADE_PIX_EM_SEGUNDOS} segundos, ele será disponibilizado.`)
        }
        
    }
}