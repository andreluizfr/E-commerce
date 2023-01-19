import { Request, Response } from 'express';
import { LoginService } from '../../services/Users/loginService';
import { UsersRepository } from "../../repositories/Users/UsersRepository";

const usersRepository = new UsersRepository();
const loginService = new LoginService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class LoginController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { email, password } = req.body;

        try{

            const { accessToken, refreshToken, user }  = await loginService.execute({email, password});

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXP || "604800000") )
            });

            const publicUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate,
                cpf: user.cpf,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
            }
            return res.status(201).send({
                message: "Login succesfull.",
                accessToken: accessToken,
                user: publicUser
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                message: error.message || 'Unexpected error.',
                accessToken: null,
                user: null
            });

        } 

    } 

}