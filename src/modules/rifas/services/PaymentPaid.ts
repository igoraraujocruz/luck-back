import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';
import { io } from '../../../shared/http';
import { contract as rifasClientsContract } from '../../rifasClients/interfaces/contract';
import { contract as productsContract } from '../../products/interfaces/contract';
import { contract as clientsContract } from '../../clients/interfaces/contract';

@injectable()
export class PaymentPaid {
    constructor(
        @inject('Rifa')
        private repository: contract,
        @inject('RifasClients')
        private rifasClientsRepository: rifasClientsContract,
        @inject('Product')
        private productsRepository: productsContract,
        @inject('Client')
        private clientsRepository: clientsContract,
    ) {}

    async execute(txid: string) {

        const rifasClientes = await this.rifasClientsRepository.findByTxId(txid)

        let productSlug = ''

        for(const rifaCliente of rifasClientes) {
            const rifa = await this.repository.findById(rifaCliente.rifaId);

            if(!rifa) {
                throw new AppError('Nº não encontrado')
            }

            const product = await this.productsRepository.findById(rifa.productId)

            if(!product) {
                throw new AppError('Produto não encontrado')
            }

            productSlug = product.slug

            rifa.isPaid = true

            await this.repository.save(rifa)
        }

        io.to(productSlug).emit("updateRifas")

        const client = await this.clientsRepository.findById(rifasClientes[0].clientId);

        if (!client) {
            throw new AppError('Cliente não encontrado.')
        }

        io.to(client.socketId).emit("client:reset")
    }
}