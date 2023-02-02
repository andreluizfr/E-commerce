import { IUsersRepository } from "../../repositories/Users/IUsersRepository";

interface IVerifyEmailRequestDTO{
    verificationEmailCode: string;
}
//contains the business logic
export class VerifyEmailService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: IVerifyEmailRequestDTO){

        const verifiedUser = await this.usersRepository.verifyEmail(data.verificationEmailCode);
        
        if(verifiedUser) return {verifiedUser: verifiedUser};
        else throw new Error("Código de verificação de e-mail não válido.");

    }
    
}