import { Client } from '../../clients/infra/Entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity('rifas')
export class Rifa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    number: number;

    @Column()
    price: number;

    @Column()
    isPaid: boolean;
    
    @ManyToMany(() => Client)
    @JoinTable({
        name: 'rifasClients',
        joinColumn: {
            name: 'rifaId',
        },
        inverseJoinColumn: {
            name: 'clientId'
        }
    })
    clients: Client[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}