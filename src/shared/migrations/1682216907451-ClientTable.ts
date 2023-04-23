import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ClientTable1682216907451 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'clients',
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
                        name: 'numberPhone',
                        type: 'varchar',
                    },
                    {
                        name: 'rifaId',
                        type: 'uuid',
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
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKClientsRifas',
                        referencedTableName: 'rifas',
                        referencedColumnNames: ['id'],
                        columnNames: ['rifaId'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }

}
