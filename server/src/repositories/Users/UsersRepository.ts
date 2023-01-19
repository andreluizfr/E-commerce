import { User } from "../../entities/User";
import { IUsersRepository } from "./IUsersRepository";
import { AppDataSource } from "../../database/postgres";

export class UsersRepository implements IUsersRepository{

    async createUser(user: User){
        const userRepository = AppDataSource.getRepository(User);
        const createdUser = await userRepository.save(user);

        return createdUser;
    };

    async updateRefreshToken(email: string, newRefreshToken: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({email: email});

        if (user){
            user.refreshToken = newRefreshToken;
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } else return null;
    }

    async verifyEmail(verificationEmailCode: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({verificationEmailCode: verificationEmailCode});

        if (user){
            user.emailVerified = true;
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } else return null;
    }

    async findByEmail(email: string){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({email: email});

        return user;
    }

    async findByEmailAndPassword(email: string, password: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({email: email, password: password});

        return user;
    }
    
    async findByEmailAndRefreshToken(email: string, refreshToken: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({email: email, refreshToken: refreshToken});

        return user;
    }

    

}