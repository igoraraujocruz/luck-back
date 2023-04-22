import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Client } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { contract as rifaContract } from '../../rifas/interfaces/contract';
import { contract as rifasClientsContract } from '../../rifasClients/interfaces/contract';
import { create } from '../interfaces/create';
import { gerarPix } from './gerarPix';

@injectable()
export class Create {
    constructor(
        @inject('Client')
        private repository: contract,
        @inject('Rifa')
        private rifaRepository: rifaContract,
        @inject('RifasClients')
        private rifasClientsRepository: rifasClientsContract,
    ) {}

    async execute(
        {name, numberPhone, rifas}: create 
    ): Promise<Client> {

        const client = await this.repository.create({name, numberPhone})

        if(!rifas) {
            throw new AppError('Rifaz vazias')
        }

        for(const rifa of rifas) {
            const rifas = await this.rifaRepository.findById(rifa);

            if(!rifas) {
                throw new AppError('Rifa não encontrada')  
            }

            if(rifas.clients.length > 0) {
                throw new AppError(`A Rifa n° ${rifas.number} foi reservada! Se o pagamento não for efetuado em até 2 minutos ela será disponibizada`)
            }   
        }

        rifas.forEach(async rifa => {
            await this.rifasClientsRepository.create(rifa, client.id)
        })

        return client
    }
}