import { MigrationInterface, QueryRunner } from "typeorm"

export class SetAndreToAdmin1677206075691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET "admin" = true WHERE "email" = 'andre.luizfr2@gmail.com';`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET "admin" = false WHERE "email" = 'andre.luizfr2@gmail.com';`,
        )
    }

}
