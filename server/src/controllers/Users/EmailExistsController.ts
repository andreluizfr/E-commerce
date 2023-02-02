import { Request, Response } from 'express';
import { EmailExistsService } from '../../services/Users/EmailExistsService';
import { UsersRepository } from "../../repositories/Users/UsersRepository";

const usersRepository = new UsersRepository();
const emailExistsService = new EmailExistsService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class EmailExistsController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { email } = req.body;

        try{

            const exists = await emailExistsService.execute({ email });

            return res.status(201).send({
                exists: exists,
                message: "E-mail procurado com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                exists: false,
                message: "Erro ao buscar e-mail. Por favor, tente mais tarde."
            });

        } 

    } 

}