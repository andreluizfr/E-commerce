import { IUsersRepository } from "../../repositories/Users/IUsers.repository";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../services/Auth';

export class RefreshTokenService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private usersRepository: IUsersRepository){}

    async execute(refreshToken: string){

        const email = verifyRefreshToken(refreshToken);

        const user = await this.usersRepository.findByEmailAndRefreshToken(email, refreshToken);

        if(user){
            
            const newRefreshToken = createRefreshToken(email);
            const updatedUser = await this.usersRepository.updateRefreshToken(email, newRefreshToken);

            if(!updatedUser)
                throw new Error("Error while updating the refresh token.");
            else {
                const newAccessToken = createAccessToken(email);
                return {newAccessToken: newAccessToken, newRefreshToken: newRefreshToken};
            }
                
        } else throw new Error("Invalid Refresh Token for this user");

    }
    
}