import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { createAccessToken, createRefreshToken } from '../../auth';
import * as bcrypt from 'bcrypt';
import { z } from "zod";

const loginRequestDTO = z.object({
    email: z.string({required_error: "E-mail não informado."}),
    password: z.string({required_error: "Senha não informada."})
});

type LoginRequestDTO = z.infer<typeof loginRequestDTO>;

//contains the business logic
export class LoginService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: LoginRequestDTO){

        const parseResponse = loginRequestDTO.safeParse(data);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const user = await this.usersRepository.findByEmail(data.email);

        if(user){
            const isMatch = await bcrypt.compare(data.password, user.password);

            if(isMatch){

                if(user.emailVerified){

                    const accessToken = createAccessToken(data.email);
                    const refreshToken = createRefreshToken(data.email);

                    const updatedUser = await this.usersRepository.updateRefreshToken(data.email, refreshToken);

                    if(updatedUser) return {accessToken: accessToken, refreshToken: refreshToken, user: updatedUser};
                    else throw new Error("Não foi possível autenticar.");

                } else throw new Error("Aguardando verificação por e-mail.");

            } else throw new Error("E-mail ou senha incorreta.");
                
        } else throw new Error("E-mail ou senha incorreta.");

    }
    
}