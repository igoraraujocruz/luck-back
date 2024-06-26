import { Product } from '../infra/Entity'
import { create } from './create'

export interface contract {
    create({ name, description, imgSrc, 
            luckDay, price, quantidadeDeRifas, 
            videoSrc, slug }: create): Promise<Product>;
    getAll(): Promise<Product[]>;
    save(product: Product): Promise<Product>;
    findById(productId: string): Promise<Product | undefined>;
    findBySlug(productSlug: string): Promise<Product | undefined>;
}