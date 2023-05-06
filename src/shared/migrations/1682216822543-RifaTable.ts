import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RifaTable1682216822543 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'rifas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'number',
                        type: 'int',
                    },
                    {
                        name: 'productId',
                        type: 'uuid',
                    },
                    {
                        name: 'isPaid',
                        type: 'boolean',
                        default: false
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
                foreignKeys: [
                    {
                        name: 'FKRifasProducts',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['productId'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rifas');
    }

}
