import { Request, Response } from 'express';
import { VerifyEmailService } from '../../services/UsersServices/verifyEmailService';
import { UsersRepository } from "../../repositories/Users/UsersRepository";

const usersRepository = new UsersRepository();
const verifyEmailService = new VerifyEmailService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class SignupController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { verificationEmailCode } = req.body;

        try{

            const { verifiedUser } = await verifyEmailService.execute({verificationEmailCode});

            return res.status(201).send({
                message: "Email verification succesfull.",
                verified: true
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}