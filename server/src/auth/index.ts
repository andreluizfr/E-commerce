import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface IjwtPayload {
    email: string
    expiresIn: string;
}

export function createAccessToken (email: string) {

    const accessToken = jwt.sign({ email: email }, process.env.JWT_SECRET || 'ssshhhhhhh', {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP || "900000" // expires in 15 min in production, 1 min in development
    });

    return accessToken;
}

export function createRefreshToken (email: string) {

    const refreshToken = jwt.sign({ email: email }, process.env.JWT_SECRET || 'ssshhhhhhh', {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP || "604800000"  // expires in one week in production, 1 hour in development
    });

    return refreshToken;
}

export function authentication (req : Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.send({
            authenticated: false,
            refresh: false, message: 'No token provided.'
        });

    const [ , accessToken] = authHeader.split(" ");

    try {

        const jwtPayload = jwt.verify(accessToken, process.env.SECRET || 'ssshhhhhhh') as IjwtPayload;
        
        //repassando essas informaçoes pelo req pra rota solicitada
        req.body.email = jwtPayload.email;
        next();

    } catch (err) {
        const error = err as Error;

        if(error.name === 'TokenExpiredError') {

            return res.send({
                authenticated: true,
                refresh: true,
                message: 'You need to refresh your accessToken.'
            });

        } else {

            return res.send({
                authenticated: false,
                refresh: false,
                message: 'Invalid access token, you need logging again.'
            });

        }
    
    }

}

export function verifyRefreshToken(refreshToken: string){

    try {

        const jwtPayload = jwt.verify(refreshToken, process.env.SECRET || 'ssshhhhhhh') as IjwtPayload;
        return jwtPayload.email;

    } catch (err) {
        const error = err as Error;

        if(error.name === 'TokenExpiredError') {
            throw new Error("Expired Refresh Token, please log in.");
        }
        throw new Error("Invalid Refresh Token, please log in.");

    }

}