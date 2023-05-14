import { AppError } from '../../../shared/AppError';
import { inject, injectable } from 'tsyringe';
import { Rifa } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { contract as rifasClientsContract } from '../../rifasClients/interfaces/contract';
import { contract as productsContract } from '../../products/interfaces/contract';
import { io } from '../../../shared/http';

@injectable()
export class VerifyRifaPaidIsTrue {
    constructor(
        @inject('Rifa')
        private repository: contract,
        @inject('RifasClients')
        private rifasClientsRepository: rifasClientsContract,
        @inject('Product')
        private productsRepository: productsContract,
    ) {}

    async execute(
        rifas: string[]) {

        let rifaIsPaid = false;
        let productSlug = ''

        for(const rifa of rifas) {
            const findRifa = await this.repository.findById(rifa);

            if(!findRifa) {
                throw new AppError('Rifa não encontrada')
            }

            const product = await this.productsRepository.findById(findRifa.productId)

            if(!product) {
                throw new AppError('Produto não encontrado')
            }

            productSlug = product.slug

            if (findRifa.isPaid === false) {
                await this.rifasClientsRepository.remove(findRifa.id)
            } else {
                rifaIsPaid = true
            }
        }

        if (!rifaIsPaid) {
            io.to(productSlug).emit("updateRifas")
            console.log('não pagou')
        }
    }
}