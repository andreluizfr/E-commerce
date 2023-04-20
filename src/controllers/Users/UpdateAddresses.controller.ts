import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/Users/UpdateUser.service';
import { UsersRepository } from "../../repositories/Users/Users.repository";

const usersRepository = new UsersRepository();
const updateUserService = new UpdateUserService(usersRepository);

//receive a request, calls the use-case, then send back a response
export default new class UpdateAddressesController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { userId, email, ...rest } = req.body; //o email vem pelo middleware de autenticação
        
        const changes = { ...rest };

        try{
            if(userId){
                const { updatedUser } = await updateUserService.execute({userId, changes, email});

                if(updatedUser)
                    return res.status(201).send({
                        refresh: false,
                        success: true,
                        addresses: updatedUser.addresses,
                        message: "Sua lista de endereços foi atualizada com sucesso."
                    });
                else
                    return res.status(202).send({
                        refresh: false,
                        success: true,
                        addresses: null,
                        message: "Usuário não encontrado."
                    });
                
            }
            else
                return res.status(202).send({
                    refresh: false,
                    success: true,
                    addresses: null,
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