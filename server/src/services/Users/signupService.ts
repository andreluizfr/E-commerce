import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { User }  from "../../entities/User";
import { UserDTO } from "../../repositories/Users/UserDTO";

import generateRandomString from "../../utils/generateRandomString";
import { sendVerificationLinkToEmail } from "../../helpers/sendEmail";


//contains the business logic
export class SignupService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: UserDTO){

        const verificationEmailCode = generateRandomString(30);
        const user = new User(data, verificationEmailCode, false);
        
        const emailExists = await this.usersRepository.findByEmail(user.email);
        if (emailExists) throw new Error("E-mail já cadastrado.");

        const cpfExists = await this.usersRepository.findByCpf(user.cpf);
        if (cpfExists) throw new Error("CPF já cadastrado.");

        const createdUser = await this.usersRepository.createUser(user);
        
        try{
            await sendVerificationLinkToEmail(createdUser.email, verificationEmailCode);
        } catch (err) {
            const error = err as Error;
            await this.usersRepository.deleteUser(createdUser);
            throw new Error('Verificação de e-mail não está funcionando. Por favor, tente mais tarde. ' + error.message);
        }

    }
    
}