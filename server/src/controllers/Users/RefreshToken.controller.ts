import { Request, Response } from 'express';
import { RefreshTokenService } from '../../services/Users/RefreshToken.service';

const refreshTokenService = new RefreshTokenService();

//receive a request, calls the use-case, then send back a response
export default new class RefreshTokenController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const refreshToken = req.cookies.refreshToken;

        try{

            const { newAccessToken, newRefreshToken }  = await refreshTokenService.execute(refreshToken);

            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXP || "604800000") )
            });

            return res.status(201).send({
                success: true,
                message: "Access token refreshed.",
                accessToken: newAccessToken
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.',
                accessToken: null
            });

        } 

    } 

}