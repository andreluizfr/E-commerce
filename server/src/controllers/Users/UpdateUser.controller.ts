import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/Users/UpdateUser.service';
import { UsersRepository } from "../../repositories/Users/Users.repository";
import { UserDTO } from '../../repositories/Users/UserDTO';

const usersRepository = new UsersRepository();
const updateUserService = new UpdateUserService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class UpdateProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { userId, firstName, lastName, email, birthDate, cpf, phoneNumber, password, emailVerified, verificationEmailCode,
            admin, addresses, photoURL, ratings, created_at } : UserDTO = req.body;
        
        const changes = { firstName, lastName, email, birthDate, cpf, phoneNumber, password, emailVerified, verificationEmailCode,
            admin, addresses, photoURL, ratings, created_at } as UserDTO;

        try{
            if(userId){
                const { updatedUser } = await updateUserService.execute({userId, changes});

                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedUser: updatedUser,
                    message: "O usuário foi atualizado com sucesso."
                });
            }
            else
                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedUser: null,
                    message: "Propriedade userId não foi informada."
                });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedUser: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}