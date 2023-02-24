import { MigrationInterface, QueryRunner } from "typeorm";

//comando para instalar a cli npm install -g typeorm
//comando usado para criar esse arquivo typeorm migration:create src/database/migrations/SetUserToAdmin
//comando para rodar npm run typeorm migration:run -- -d src/database/postgres.ts
//comando para reverter última migration npm run typeorm migration:revert -- -d src/database/postgres.ts

export class SetMatheusToAdmin1676865454800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET "admin" = true WHERE "email" = 'mmag2@cin.ufpe.br';`,
            //`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL);`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE "Users" SET "admin" = false WHERE "email" = 'mmag2@cin.ufpe.br';`,
            //`DROP TABLE "users";`
        )
    }

}
