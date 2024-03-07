import { Router } from 'express';
import { router as clientsRouter } from '../modules/clients/infra/routes';
import { router as rifasRouter } from '../modules/rifas/infra/routes';
import { router as productsRouter } from '../modules/products/infra/routes';
import { router as rifasClientsRouter } from '../modules/rifasClients/infra/routes';
import { router as usersClientsRouter } from '../modules/users/infra/routes';

export const routes = Router();
routes.use('/clients', clientsRouter);
routes.use('/rifas', rifasRouter);
routes.use('/products', productsRouter);
routes.use('/rifasClients', rifasClientsRouter);
routes.use('/users', usersClientsRouter);