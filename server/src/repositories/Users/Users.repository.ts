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
        await usersRepository.delete({id: userId});
    };

    async updateUser(userId: string, changes: object){
        const usersRepository = AppDataSource.getRepository(User);
        const user = await usersRepository.findOneBy({id: userId});

        if (user){
            Object.assign(user, changes);
            userDTO.parse(user);

            const updatedUser = await usersRepository.save(user);
            return updatedUser;
        } 
        else return null;
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

    async findById(userId: string){
        const usersRepository = AppDataSource.getRepository(User)
        const user = await usersRepository.find({
            relations: {
                payments: true,
                ratings: true
            },
            where:{
                id: userId
            }
        });

        return user[0];
    }

    async findByEmail(email: string){
        const usersRepository = AppDataSource.getRepository(User)
        const user = await usersRepository.find({
            relations: {
                payments: true,
                ratings: true
            },
            where:{
                email: email
            }
        });

        return user[0];
    }

    async findByCpf(cpf: string){
        const usersRepository = AppDataSource.getRepository(User)
        const user = await usersRepository.find({
            relations: {
                payments: true,
                ratings: true
            },
            where:{
                cpf: cpf
            }
        });

        return user[0];
    }   

}