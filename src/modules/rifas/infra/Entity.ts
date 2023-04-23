import { Product } from '../../products/infra/Entity';
import { Client } from '../../clients/infra/Entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity('rifas')
export class Rifa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column()
    isPaid: boolean;
    
    @OneToOne(() => Client, client => client.rifa, {
        eager: true
    })
    client: Client;

    @Column()
    productId: string;

    @ManyToOne(() => Product, product => product.rifas)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}