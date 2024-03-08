import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFieldIsActiveInProductTable1709763524222 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.addColumn('products', new TableColumn({
				name: 'isActivate',
				type: 'boolean',
				default: true
			}))
		}

    async down(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.dropColumn('products', 'isActivate');
		}

}
