import { getRepository, Repository as TypeormRepository } from 'typeorm';
import { contract } from '../interfaces/contract';
import { User } from './Entity';
import { create } from '../interfaces/create'

export class Repository implements contract {
    private ormRepository: TypeormRepository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    async create({ username, password }: create): Promise<User> {
        const item = this.ormRepository.create({ username, password });

        await this.ormRepository.save(item);

        return item;
    }

    async findById(id: string): Promise<User | undefined> {
        const item = await this.ormRepository.findOne({
            where: { id }
        })

        return item
    }

    async save(item: User): Promise<User> {
        return this.ormRepository.save(item);
    }
}