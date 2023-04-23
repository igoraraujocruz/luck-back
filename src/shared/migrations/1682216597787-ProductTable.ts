import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProductTable1682216597787 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'imgSrc',
                        type: 'varchar',
                    },
                    {
                        name: 'videoSrc',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'luckDay',
                        type: 'timestamp',
                    },
                    {
                        name: 'price',
                        type: 'decimal'
                    },
                    {
                        name: 'quantidadeDeRifas',
                        type: 'int'
                    },
                    {
                        name: 'rifasRestantes',
                        type: 'int'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
