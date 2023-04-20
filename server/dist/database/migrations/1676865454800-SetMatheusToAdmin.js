"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetMatheusToAdmin1676865454800 = void 0;
class SetMatheusToAdmin1676865454800 {
    async up(queryRunner) {
        await queryRunner.query(`UPDATE "Users" SET admin = true WHERE email = 'mmag2@cin.ufpe.br';`);
    }
    async down(queryRunner) {
        await queryRunner.query(`UPDATE "Users" SET admin = false WHERE email = 'mmag2@cin.ufpe.br';`);
    }
}
exports.SetMatheusToAdmin1676865454800 = SetMatheusToAdmin1676865454800;
