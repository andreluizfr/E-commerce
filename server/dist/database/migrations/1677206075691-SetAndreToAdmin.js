"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAndreToAdmin1677206075691 = void 0;
class SetAndreToAdmin1677206075691 {
    async up(queryRunner) {
        await queryRunner.query(`UPDATE "Users" SET admin = true WHERE email = 'andre.luizfr2@gmail.com';`);
    }
    async down(queryRunner) {
        await queryRunner.query(`UPDATE "Users" SET admin = false WHERE email = 'andre.luizfr2@gmail.com';`);
    }
}
exports.SetAndreToAdmin1677206075691 = SetAndreToAdmin1677206075691;
