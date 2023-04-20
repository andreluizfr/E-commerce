"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const User_entity_1 = require("../../entities/User.entity");
const data_source_1 = require("../../database/data-source");
const UserDTO_1 = require("./UserDTO");
class UsersRepository {
    async createUser(user) {
        user.birthDate = new Date(user.birthDate);
        const parseResponse = UserDTO_1.userDTO.safeParse(user);
        if (!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const createdUser = await usersRepository.save(user);
        return createdUser;
    }
    ;
    async deleteUser(userId) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        await usersRepository.delete({ id: userId });
    }
    ;
    async updateUser(userId, changes) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = await usersRepository.findOneBy({ id: userId });
        if (user) {
            Object.assign(user, changes);
            UserDTO_1.userDTO.parse(user);
            const updatedUser = await usersRepository.save(user);
            return updatedUser;
        }
        else
            return null;
    }
    async verifyEmail(verificationEmailCode) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = await usersRepository.findOneBy({ verificationEmailCode: verificationEmailCode });
        if (user) {
            user.emailVerified = true;
            const updatedUser = await usersRepository.save(user);
        }
        else
            throw new Error("Código de verificação de e-mail não registrado no sistema.");
    }
    async findById(userId) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = await usersRepository.find({
            relations: {
                orders: true,
                ratings: true
            },
            where: {
                id: userId
            }
        });
        return user[0];
    }
    async findByEmail(email) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = await usersRepository.find({
            relations: {
                orders: true,
                ratings: true
            },
            where: {
                email: email
            }
        });
        return user[0];
    }
    async findByCpf(cpf) {
        const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
        const user = await usersRepository.find({
            relations: {
                orders: true,
                ratings: true
            },
            where: {
                cpf: cpf
            }
        });
        return user[0];
    }
}
exports.UsersRepository = UsersRepository;
