import { Request, Response } from 'express';
import { LoginService } from '../../services/Users/Login.service';
import { UsersRepository } from "../../repositories/Users/Users.repository";

const usersRepository = new UsersRepository();
const loginService = new LoginService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class LoginController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { email, password } = req.body;

        try{

            const { accessToken, refreshToken }  = await loginService.execute({email, password});

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXP || "604800000") )
            });

            return res.status(201).send({
                success: true,
                message: "Login realizado com sucesso.",
                accessToken: accessToken,
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.',
                accessToken: null,
            });

        } 

    } 

}