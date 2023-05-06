import { Rifa } from '../../rifas/infra/Entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    imgSrc: string;

    @Column()
    videoSrc: string;

    @Column()
    description: string;

    @Column()
    luckDay: Date;

    @Column()
    slug: string;

    @Column()
    price: number;

    @Column()
    quantidadeDeRifas: number;

    @Column()
    rifasRestantes: number;

    @OneToMany(() => Rifa, rifa => rifa.product, {
        eager: true
    })
    rifas: Rifa[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}