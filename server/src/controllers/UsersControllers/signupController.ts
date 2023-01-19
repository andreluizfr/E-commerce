import { Request, Response } from 'express';
import { SignupService } from '../../services/UsersServices/signupService';
import { UsersRepository } from "../../repositories/Users/UsersRepository";

const usersRepository = new UsersRepository();
const signupService = new SignupService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class SignupController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { firstName, lastName, email, birthDate, cpf, password } = req.body;

        try{

            await signupService.execute({firstName, lastName, email, birthDate, cpf, password});

            return res.status(201).send({
                message: "Signup succesfull, waiting for e-mail confirmation."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}