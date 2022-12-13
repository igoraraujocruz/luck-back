import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Create } from '../services/Create';
import { GetById } from '../services/GetById';
import { gerarPix } from '../services/gerarPix';
import { GetAll } from '../services/GetAll';
import { GetBySellerId } from '../services/GetBySellerId';
import { AppError } from '../../../shared/AppError';
import { SaveReferenceId } from '../services/SaveReferenceId';
import { ReceiveConfirmationPixAndSendEmails } from '../services/ReceiveConfirmationPixAndSendEmails';
import { UpdateStatus } from '../services/UpdateStatus';
import axios from 'axios';
import qs from 'qs';

export class Controller {
    async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
                
        const { clientId, sellerId, typeOfPayment, socketId } =
            request.body;

        const create = container.resolve(Create);

        const item = await create.execute({
            clientId, sellerId, typeOfPayment, socketId,
            status: 'Aguardando Pagamento'
        });

        return response.status(200).json(item);
    }

    async get(request: Request, response: Response): Promise<Response> {

        const { sellerId, shopId } = request.query;

        if (sellerId) {
            const get = container.resolve(GetBySellerId);

            const product = await get.execute(String(sellerId));

            return response.json(instanceToPlain(product));
        }

        if (shopId) {
            const get = container.resolve(GetById);

            const shop = await get.execute(String(shopId));

            return response.json(instanceToPlain(shop));
        }

        const getAll = container.resolve(GetAll)

        const item = await getAll.execute()

        return response.status(200).json(instanceToPlain(item))
    }

    async generateGerencianetCharge(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const { shopId } = request.body;

        const getById = container.resolve(GetById);

        const items = await getById.execute(shopId)

        if(!items) {
            throw new AppError('ShopId não encontrado')
        }

        const priceOfProducts = items.order.reduce((prev, curr) => {
            return prev + curr.product.price * curr.quantity
        }, 0)

        const taxeGerencianet = Number((priceOfProducts*1.19/100).toFixed(2))

        const totalPrice = priceOfProducts + taxeGerencianet

        setTimeout(async () => {
            try {
                const getById = container.resolve(GetById);

                const shop = await getById.execute(shopId)

                if(!shop) {
                    throw new AppError('ShopId não encontrado')
                }
        
                const contraProva = shop.order.reduce((prev, curr) => {
                    return prev + curr.product.price * curr.quantity
                }, 0)

                const taxeGerencianet = Number((contraProva*1.19/100).toFixed(2))

                const totalPriceContraProva = contraProva + taxeGerencianet

                if(totalPrice != totalPriceContraProva) {
                    throw new AppError('Valores divergentes')
                }

                const pix = await gerarPix(contraProva, shopId)

                const txid = pix.cobranca.data.txid

                const saveReferenceId = container.resolve(
                    SaveReferenceId,
                );

                await saveReferenceId.execute(txid, shop.id)
        
                return response.status(200).json(pix.qrcode.data);
                
            } catch(err) {
                console.log(err)
            }
          }, 1000)

          return response.status(200);
    }

    async receiveConfirmationPix(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const { txid } = request.body.pix[0]

        const receiveConfirmationPixAndSendEmails = container.resolve(
            ReceiveConfirmationPixAndSendEmails,
        );

        await receiveConfirmationPixAndSendEmails.execute(txid);

        return response.send('200');
    }

    async teste(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const teste = request.body;

        console.log(teste)

        const data = { 'id': '5527997998675', 'message': 'oláaaaa' };

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'http://localhost:3333/message/text?key=111',
          };

        axios(options)

        return response.send('200');
    }

    async updateStatus(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { shopId, status } = request.body

        const updateStatus = container.resolve(
            UpdateStatus,
        );

        const shop = await updateStatus.execute(shopId, status);

        return response.status(200).json(shop);
    }

}