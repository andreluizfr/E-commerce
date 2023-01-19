import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { createAccessToken, createRefreshToken } from '../../auth';
import * as bcrypt from 'bcrypt';

interface ILoginRequestDTO{
    email: string;
    password: string;
}
//contains the business logic
export class LoginService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: ILoginRequestDTO){

        const user = await this.usersRepository.findByEmail(data.email);

        if(user){
            const isMatch = await bcrypt.compare(data.password, user.password);

            if(isMatch){

                if(user.emailVerified){

                    const accessToken = createAccessToken(data.email);
                    const refreshToken = createRefreshToken(data.email);

                    const updatedUser = await this.usersRepository.updateRefreshToken(data.email, refreshToken);

                    if(updatedUser) return {accessToken: accessToken, refreshToken: refreshToken, user: updatedUser};
                    else throw new Error("Couldn't authenticate");

                } else throw new Error("Waiting for e-mail verification.");

            } else throw new Error("Username or password is incorrect!");
                
        } else throw new Error("Username or password is incorrect!");

    }
    
}