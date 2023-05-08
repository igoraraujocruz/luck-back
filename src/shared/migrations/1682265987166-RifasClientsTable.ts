import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RifasClientsTable1682265987166 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rifasClients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'rifaId',
                        type: 'uuid',
                    },
                    {
                        name: 'txid',
                        type: 'varchar',
                    },
                    {
                        name: 'clientId',
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
                        columnNames: ['rifaId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'rifas',
                    },
                    {
                        columnNames: ['clientId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'clients',
                    },
                ],
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rifasClients');
    }

}
