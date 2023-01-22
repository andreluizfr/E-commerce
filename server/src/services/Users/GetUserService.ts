import { IUsersRepository } from "../../repositories/Users/IUsersRepository";

//contains the business logic
export class GetUserService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(email: string){

        const user = await this.usersRepository.findByEmail(email);

        if(user) return {user: user};
        else throw new Error("User not found.");

    }
    
}