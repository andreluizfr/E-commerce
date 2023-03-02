import { User } from "../../entities/User.entity";
import { IUsersRepository } from "./IUsers.repository";
import { AppDataSource } from "../../database/data-source";
import { userDTO } from "./UserDTO";

export class UsersRepository implements IUsersRepository{

    async createUser(user: User){
        user.birthDate = new Date(user.birthDate);
        const parseResponse = userDTO.safeParse(user);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const usersRepository = AppDataSource.getRepository(User);
        const createdUser = await usersRepository.save(user);

        return createdUser;
    };

    async deleteUser(userId: string){
        const usersRepository = AppDataSource.getRepository(User);
        await usersRepository.delete({userId: userId});
    };

    async updateRefreshToken(email: string, newRefreshToken: string){
        const usersRepository = AppDataSource.getRepository(User);
        const user = await usersRepository.findOneBy({email: email});

        if (user){
            user.refreshToken = newRefreshToken;
            const updatedUser = await usersRepository.save(user);
            return updatedUser;
        } else return null;
    }

    async verifyEmail(verificationEmailCode: string){
        if(verificationEmailCode==="null")
            throw new Error("Código de verificação de e-mail não registrado no sistema.");

        const usersRepository = AppDataSource.getRepository(User);
        const user = await usersRepository.findOneBy({verificationEmailCode: verificationEmailCode});

        if (user){
            user.emailVerified = true;
            user.verificationEmailCode = "null";
            const updatedUser = await usersRepository.save(user);
            return updatedUser;
        } else return null;
    }

    async findByEmail(email: string){
        const usersRepository = AppDataSource.getRepository(User)
        const user = await usersRepository.findOneBy({email: email});

        return user;
    }

    async findByCpf(cpf: string){
        const usersRepository = AppDataSource.getRepository(User)
        const user = await usersRepository.findOneBy({cpf: cpf});

        return user;
    }
    
    async findByEmailAndRefreshToken(email: string, refreshToken: string){
        const usersRepository = AppDataSource.getRepository(User);
        const user = await usersRepository.findOneBy({email: email, refreshToken: refreshToken});

        return user;
    }

    

}