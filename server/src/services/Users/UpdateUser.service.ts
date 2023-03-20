import { IUsersRepository } from "../../repositories/Users/IUsers.repository";
import { UserDTO } from "../../repositories/Users/UserDTO";

interface IUpdateUserRequestDTO{
    userId: string;
    changes: UserDTO;
}

//contains the business logic
export class UpdateUserService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: IUpdateUserRequestDTO){

        const userWhoMadeRequest = await this.usersRepository.findByEmail(data.changes.email);
        const userToUpdate = await this.usersRepository.findById(data.userId);

        if(userWhoMadeRequest && userToUpdate){
            if(userWhoMadeRequest.email === userToUpdate.email){
                const updatedUser = await this.usersRepository.updateUser(data.userId, data.changes);
                return {updatedUser: updatedUser};
            }
            else throw new Error("Você não pode modificar outro usuário.");
        }
        else throw new Error("Usuário não encontrado.");
    
    }
    
}