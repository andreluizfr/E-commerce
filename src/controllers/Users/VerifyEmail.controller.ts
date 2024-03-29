import { Request, Response } from 'express';
import { VerifyEmailService } from '../../services/Users/VerifyEmail.service';
import { UsersRepository } from "../../repositories/Users/Users.repository";

const usersRepository = new UsersRepository();
const verifyEmailService = new VerifyEmailService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class SignupController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { verificationEmailCode } = req.body;

        try{

            await verifyEmailService.execute({verificationEmailCode});

            return res.status(201).send({
                message: "E-mail verificado com sucesso.",
                success: true
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                message: error.message || 'Unexpected error.',
                success: false
            });

        } 

    } 

}