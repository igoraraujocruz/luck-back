import { Rifa } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ number, productId }: create): Promise<Rifa>;
    getAll(): Promise<Rifa[]>;
    save(rifa: Rifa): Promise<Rifa>;
    findById(rifa: string): Promise<Rifa | undefined>;
}