import { Product } from '../../products/infra/Entity';
import { Client } from '../../clients/infra/Entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('rifasClients')
export class RifaClient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rifaId: string;

    @Column()
    clientId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}