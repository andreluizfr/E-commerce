import request from "supertest";
import app from "../../../app";
import { AppDataSource } from '../../../database/data-source';

describe("Teste inicial", ()=>{

    beforeAll(async ()=>{
        //inicializando conexão com banco de dados
        try{
            await AppDataSource.initialize();
        } catch (error: any) {
            console.log(error);
        }
    });

    afterAll(async ()=>{
        //encerrando conexão com banco de dados
        try{
            await AppDataSource.destroy();
        } catch (error: any) {
            console.log(error);
        }
    });

    test("/user/login @POST", async ()=>{
        const mockRequestBody = {
            email: "andre@email",
            password: "andre123"
        }
    
        const response = await request(app).post("/user/login")
            .send(mockRequestBody)
            .expect(202);

        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBe("E-mail ou senha incorreta.");
        expect(response.body.accessToken).toBeNull();

        //expect(response.headers["Content-Type"]).toMatch(/json/);
        //.set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo'])
    })
});