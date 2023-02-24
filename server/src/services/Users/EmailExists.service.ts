import { IUsersRepository } from "../../repositories/Users/IUsers.repository";

interface IEmailExistsRequestDTO {
    email: string;
}

//contains the business logic
export class EmailExistsService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: IEmailExistsRequestDTO){

        const user = await this.usersRepository.findByEmail(data.email);

        if(user) return true;
        else return false;

    }
    
}