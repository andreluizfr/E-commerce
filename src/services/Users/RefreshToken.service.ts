import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../services/Auth';

export class RefreshTokenService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (){}

    async execute(refreshToken: string){

        const email = verifyRefreshToken(refreshToken);
        const newRefreshToken = createRefreshToken(email);
        const newAccessToken = createAccessToken(email);

        return {newAccessToken: newAccessToken, newRefreshToken: newRefreshToken};

    }
    
}