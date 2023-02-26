import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from '../../repositories/Users/Users.repository';
import { IsAdminService } from '../../services/Users/IsAdmin.service';

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
            refresh: false,
            success: false,
            message: 'No token provided.'
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
                refresh: true,
                success: false,
                message: 'You need to refresh your accessToken.'
            });

        } else {

            return res.send({
                refresh: false,
                success: false,
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

export function isAdmin(req : Request, res: Response, next: NextFunction){

    const usersRepository = new UsersRepository();
    const isAdminService = new IsAdminService(usersRepository);

    try{
        const { email } = req.body;

        const isAdmin = isAdminService.execute(email);

        next();
        
    } catch (err) {
        const error = err as Error;

        return res.status(202).send({
            refresh: false,
            success: false,
            message: error.message || 'Unexpected error.',
        });

    }

}