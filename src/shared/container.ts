import { container } from 'tsyringe';

import { contract as clientContract } from '../modules/clients/interfaces/contract';
import { Repository as ClientRepository } from '../modules/clients/infra/Repository';

import { contract as rifaContract } from '../modules/rifas/interfaces/contract';
import { Repository as RifaRepository } from '../modules/rifas/infra/Repository';

import { contract as productContract } from '../modules/products/interfaces/contract';
import { Repository as ProductRepository } from '../modules/products/infra/Repository';

container.registerSingleton<clientContract>(
    'Client',
    ClientRepository,
);

container.registerSingleton<rifaContract>(
    'Rifa',
    RifaRepository,
);

container.registerSingleton<productContract>(
    'Product',
    ProductRepository,
);