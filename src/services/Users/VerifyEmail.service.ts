import { IUsersRepository } from "../../repositories/Users/IUsers.repository";

interface IVerifyEmailRequestDTO{
    verificationEmailCode: string;
}
//contains the business logic
export class VerifyEmailService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: IVerifyEmailRequestDTO){

        await this.usersRepository.verifyEmail(data.verificationEmailCode);

    }
    
}