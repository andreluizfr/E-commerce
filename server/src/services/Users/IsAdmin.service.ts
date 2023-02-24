import { IUsersRepository } from "../../repositories/Users/IUsers.repository";

//contains the business logic
export class IsAdminService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(email: string){

        const user = await this.usersRepository.findByEmail(email);

        if(user){
            if(user.admin) return true;
            else throw new Error("Não é administrador.");
        } 
        else throw new Error("Usuário não encontrado.");

    }
    
}