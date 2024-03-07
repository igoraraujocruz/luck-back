import { User } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ username, password}: create): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
}