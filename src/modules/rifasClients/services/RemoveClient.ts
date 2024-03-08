import { inject, injectable } from 'tsyringe';
import { contract } from '../../rifasClients/interfaces/contract';
import { AppError } from '../../../shared/AppError';

@injectable()
export class RemoveClient {
    constructor(
        @inject('RifasClients')
        private repository: contract,
    ) {}

    async execute(clientId: string): Promise<void> {

        const client = await this.repository.findById(clientId)

        console.log(client)

        if(!client) {
            throw new AppError('Client not found');
        }

        await this.repository.remove(clientId)
    }
}