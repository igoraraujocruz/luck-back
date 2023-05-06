import { inject, injectable } from 'tsyringe';
import { contract } from '../../rifasClients/interfaces/contract';

@injectable()
export class RemoveClient {
    constructor(
        @inject('RifasClients')
        private repository: contract,
    ) {}

    async execute(clientId: string): Promise<void | undefined> {

        const client = await this.repository.remove(clientId)

        return client;
    }
}