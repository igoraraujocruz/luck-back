import { inject, injectable } from 'tsyringe';
import { User } from '../infra/Entity';
import { contract } from '../interfaces/contract';
import { create } from '../interfaces/create';
import { hash } from 'bcryptjs';

@injectable()
export class Create {
    constructor(
        @inject('User')
        private repository: contract,
    ) {}

    async execute({
        username, password    
    }: create): Promise<User> {

        const hashedPassword = await hash(password, 8);

        const item = await this.repository.create({
            username, password: hashedPassword
        });

        return item;
    }
}