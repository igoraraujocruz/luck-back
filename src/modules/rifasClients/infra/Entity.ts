import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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