import { inject, injectable } from 'tsyringe';
import { contract } from '../../rifasClients/interfaces/contract';
import { contract as rifasContract } from '../../rifas/interfaces/contract';
import { AppError } from '../../../shared/AppError';

@injectable()
export class RemoveClient {
    constructor(
        @inject('RifasClients')
        private repository: contract,
        @inject('Rifa')
        private rifasRepository: rifasContract,
    ) {}

    async execute(clientId: string): Promise<void> {

        const rifasClients = await this.repository.findAllByClientId(clientId)

        if(!rifasClients) {
            throw new AppError('Client not found');
        }

        for(const rifaClient of rifasClients) {
            await this.repository.remove(rifaClient.rifaId)
            const rifa = await this.rifasRepository.findById(rifaClient.rifaId)
            
            if(!rifa) {
                throw new AppError('Number not found');
            }

            rifa.isPaid = false

            await this.rifasRepository.save(rifa)
        }
    }
}