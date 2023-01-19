import {User} from '../../entities/User';

export interface IUsersRepository{
    createUser(user: User) : Promise <User>;
    verifyEmail(verificationEmailCode: string) : Promise <User | null>;
    updateRefreshToken(email: string, newRefreshToken: string) : Promise <User | null>;
    findByEmail(email: string) : Promise <User | null>;
    findByEmailAndRefreshToken(email: string, refreshToken: string) : Promise <User | null>;
    findByEmailAndPassword(email: string, password: string) : Promise <User | null>;
}