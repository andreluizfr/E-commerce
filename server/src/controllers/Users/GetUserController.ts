import { Request, Response } from 'express';
import { GetUserService } from '../../services/Users/GetUserService';
import { UsersRepository } from "../../repositories/Users/UsersRepository";

const usersRepository = new UsersRepository();
const getUserService = new GetUserService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class GetUserController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { email } = req.body;

        try{

            const { user }  = await getUserService.execute(email);

            const publicUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate,
                cpf: user.cpf,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
            }

            return res.status(201).send({
                authenticated: true,
                message: "User fetching succesfull.",
                user: publicUser
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                authenticated: true,
                message: error.message || 'Unexpected error.',
                user: null
            });

        } 

    } 

}