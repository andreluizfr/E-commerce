"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = require("../../../database/data-source");
describe("Teste inicial", () => {
    beforeAll(async () => {
        try {
            await data_source_1.AppDataSource.initialize();
        }
        catch (error) {
            console.log(error);
        }
    });
    afterAll(async () => {
        try {
            await data_source_1.AppDataSource.destroy();
        }
        catch (error) {
            console.log(error);
        }
    });
    test("/user/login @POST", async () => {
        const mockRequestBody = {
            email: "andre@email",
            password: "andre123"
        };
        const response = await (0, supertest_1.default)(app_1.default).post("/user/login")
            .send(mockRequestBody)
            .expect(202);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBe("E-mail ou senha incorreta.");
        expect(response.body.accessToken).toBeNull();
    });
});
