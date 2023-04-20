import { MigrationInterface, QueryRunner } from "typeorm"

//comando para instalar a cli npm install -g typeorm
//comando usado para criar esse arquivo typeorm migration:create src/database/migrations/SetUserToAdmin
//comando para rodar npm run typeorm migration:run -- -d src/database/data-source.ts
//comando para reverter última migration npm run typeorm migration:revert -- -d src/database/data-source.ts

export class SetAndreToAdmin1677206075691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET admin = true WHERE email = 'andre.luizfr2@gmail.com';`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET admin = false WHERE email = 'andre.luizfr2@gmail.com';`,
        )
    }

}
