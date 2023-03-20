import {User} from '../../entities/User.entity';

export interface IUsersRepository{
    createUser(user: User) : Promise <User>;
    deleteUser(userId: string) : Promise <void>;
    updateUser(userId: string, changes: object) : Promise <User | null>;
    verifyEmail(verificationEmailCode: string) : Promise <User | null>;
    findById(userId: string) : Promise <User | null>;
    findByEmail(email: string) : Promise <User | null>;
    findByCpf(cpf: string) : Promise <User | null>;
}