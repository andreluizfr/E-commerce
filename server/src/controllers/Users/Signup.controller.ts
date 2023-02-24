import { Request, Response } from 'express';
import { SignupService } from '../../services/Users/Signup.service';
import { UsersRepository } from "../../repositories/Users/Users.repository";

const usersRepository = new UsersRepository();
const signupService = new SignupService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class SignupController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { firstName, lastName, email, birthDate, cpf, phoneNumber, password } = req.body;

        try{

            await signupService.execute({firstName, lastName, email, birthDate, cpf, phoneNumber, password});

            return res.status(201).send({
                success: true,
                message: "O registro foi um sucesso, aguardando pela confirmação por e-mail."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}