import { Rifa } from '../../rifas/infra/Entity';
import uploadConfig from '../../../config/upload'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';

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

    @Column()
    isActivate: boolean;

    @OneToMany(() => Rifa, rifa => rifa.product, {
        eager: true
    })
    rifas: Rifa[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Expose({ name: 'imgSrc' })
    getAvatarUrl(): string | null {
        if (!this.imgSrc) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'local':
                return `${process.env.API_HOST}/photos/${this.imgSrc}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.imgSrc}`;
            default:
                return null;
        }
    }
}