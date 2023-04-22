import { Router } from 'express';
import { router as clientsRouter } from '../modules/clients/infra/routes';
import { router as rifasRouter } from '../modules/rifas/infra/routes';

export const routes = Router();
routes.use('/clients', clientsRouter);
routes.use('/rifas', rifasRouter);