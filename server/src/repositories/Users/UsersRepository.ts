import { User } from "../../entities/User";
import { IUsersRepository } from "./IUsersRepository";
import { AppDataSource } from "../../database/postgres";
import { z } from "zod";

const cpfRegex = RegExp(/(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{3}\d{3}\d{3}\d{2})/);

const userDTO = z.object({
    firstName: z.string({required_error: "Primeiro nome não informado."})
        .min(1, {message: "O primeiro nome não deve ser vazio."})
        .max(100, {message: "O primeiro nome deve ter no máximo 100 caracteres."}),
    lastName: z.string({required_error: "Sobrenome não informado."})
        .min(1, {message: "O sobrenome não deve ser vazio."})
        .max(100, {message: "O sobrenome deve ter no máximo 100 caracteres."}),
    email: z.string({required_error: "E-mail não informado."})
        .email({message: "Um e-mail válido deve ser informado."})
        .min(1, {message: "O e-mail deve ter no mínimo 3 caracteres."})
        .max(100, {message: "O e-mail deve ter no máximo 100 caracteres."}),
    birthDate: z.date({required_error: "Data de aniversário não informada.", invalid_type_error: "A data não possui formato válido"})
        .min(new Date("1880-01-01"), { message: "Parabéns! Talvez deva ir se cadastrar no Guinness Book primeiro." })
        .max(new Date(new Date().getUTCFullYear() - 18, new Date().getUTCMonth(), new Date().getUTCDate()), { message: "Você deve ter mais de 18 anos para concluir o cadastro." }),
    cpf: z.string({required_error: "CPF não informado."})
        .regex(cpfRegex),
    password: z.string({required_error: "Senha não informada."})
        .min(8, {message: "A senha deve ter no mínimo 8 caracteres."})
        .max(64, {message: "A senha deve ter no máximo 64 caracteres"})
        .regex(/(?=.*[a-z])/)
        .regex(/(?=.*[A-Z])/)
        .regex(/(?=.*\d)/)
        .regex(/(?=.*[!@#$%&*()])/)
});

type UserDTO = z.infer<typeof userDTO>;
export class UsersRepository implements IUsersRepository{

    async createUser(user: User){
        user.birthDate = new Date(user.birthDate);
        const parseResponse = userDTO.safeParse(user);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const userRepository = AppDataSource.getRepository(User);
        const createdUser = await userRepository.save(user);

        return createdUser;
    };

    async deleteUser(user: User){
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.remove(user);
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
        if(verificationEmailCode==="null")
            throw new Error("Código de verificação de e-mail não registrado no sistema.");

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({verificationEmailCode: verificationEmailCode});

        if (user){
            user.emailVerified = true;
            user.verificationEmailCode = "null";
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } else return null;
    }

    async findByEmail(email: string){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({email: email});

        return user;
    }

    async findByCpf(cpf: string){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({cpf: cpf});

        return user;
    }
    
    async findByEmailAndRefreshToken(email: string, refreshToken: string){
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({email: email, refreshToken: refreshToken});

        return user;
    }

    

}