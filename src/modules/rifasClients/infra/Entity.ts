import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('rifasClients')
export class RifasClients {
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