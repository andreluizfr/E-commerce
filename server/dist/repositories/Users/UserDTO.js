"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDTO = void 0;
const zod_1 = require("zod");
const cpfRegex = RegExp(/(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{3}\d{3}\d{3}\d{2})/);
const phoneNumberRegex = RegExp(/[1-9]{2}9[6-9]{1}[0-9]{7}/);
const cepRegex = RegExp(/([0-9]{5}-[0-9]{3})|([0-9]{5}[0-9]{3})/);
exports.userDTO = zod_1.z.object({
    id: zod_1.z.string()
        .optional(),
    firstName: zod_1.z.string({ required_error: "Primeiro nome não informado." })
        .min(1, { message: "O primeiro nome não deve ser vazio." })
        .max(100, { message: "O primeiro nome deve ter no máximo 100 caracteres." }),
    lastName: zod_1.z.string({ required_error: "Sobrenome não informado." })
        .min(1, { message: "O sobrenome não deve ser vazio." })
        .max(100, { message: "O sobrenome deve ter no máximo 100 caracteres." }),
    email: zod_1.z.string({ required_error: "E-mail não informado." })
        .email({ message: "Um e-mail válido deve ser informado." })
        .min(1, { message: "O e-mail deve ter no mínimo 3 caracteres." })
        .max(100, { message: "O e-mail deve ter no máximo 100 caracteres." })
        .refine(email => email.toLowerCase()),
    birthDate: zod_1.z.date({ required_error: "Data de aniversário não informada.", invalid_type_error: "A data não possui formato válido" })
        .min(new Date("1880-01-01"), { message: "Parabéns! Talvez deva ir se cadastrar no Guinness Book primeiro." })
        .max(new Date(new Date().getUTCFullYear() - 18, new Date().getUTCMonth(), new Date().getUTCDate()), { message: "Você deve ter mais de 18 anos para concluir o cadastro." }),
    cpf: zod_1.z.string({ required_error: "CPF não informado." })
        .regex(cpfRegex, { message: "O CPF deve possuir formato válido." }),
    phoneNumber: zod_1.z.string({ required_error: "Número de telefone não informado" })
        .regex(phoneNumberRegex, { message: "O número do celular deve possuir formato DDD+9+número. Totalizando 11 dígitos." }),
    password: zod_1.z.string({ required_error: "Senha não informada." })
        .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
        .max(64, { message: "A senha deve ter no máximo 64 caracteres" })
        .regex(/(?=.*[a-z])/)
        .regex(/(?=.*[A-Z])/)
        .regex(/(?=.*\d)/)
        .regex(/(?=.*[!@#$%&*()])/),
    emailVerified: zod_1.z.boolean()
        .optional(),
    verificationEmailCode: zod_1.z.string()
        .optional(),
    admin: zod_1.z.boolean()
        .optional(),
    addresses: zod_1.z.array(zod_1.z.object({
        default: zod_1.z.boolean({ required_error: "Propriedade default não informada." }),
        receiverName: zod_1.z.string({ required_error: "Propriedade receiverName não informada." })
            .min(1, { message: "O Nome não deve ser vazio." })
            .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
        streetName: zod_1.z.string({ required_error: "Propriedade streetName não informada." })
            .min(1, { message: "O campo não deve ser vazio." })
            .max(100, { message: "O campo deve ter no máximo 100 caracteres." }),
        houseNumber: zod_1.z.string({ required_error: "Propriedade houseNumber não informada." })
            .min(1, { message: "O campo não deve ser vazio." })
            .max(100, { message: "O campo deve ter no máximo 100 caracteres." }),
        district: zod_1.z.string({ required_error: "Propriedade district não informada." })
            .min(1, { message: "O campo não deve ser vazio." })
            .max(100, { message: "O campo deve ter no máximo 100 caracteres." }),
        city: zod_1.z.string({ required_error: "Propriedade city não informada." })
            .min(1, { message: "O campo não deve ser vazio." })
            .max(100, { message: "O campo deve ter no máximo 100 caracteres." }),
        state: zod_1.z.string({ required_error: "Propriedade state não informada." })
            .min(1, { message: "O campo não deve ser vazio." })
            .max(100, { message: "O campo deve ter no máximo 100 caracteres." }),
        cep: zod_1.z.string({ required_error: "Propriedade cep não informada." })
            .regex(cepRegex, { message: "O cep deve possuir formato 99999-99." }),
        phoneNumber: zod_1.z.string({ required_error: "Propriedade phoneNumber não informada." })
            .regex(phoneNumberRegex, { message: "O número do celular deve possuir formato DDD+9+número. Totalizando 11 dígitos." })
    })).optional(),
    photoURL: zod_1.z.string()
        .optional()
        .nullable(),
    payments: zod_1.z.array(zod_1.z.object({}))
        .optional(),
    ratings: zod_1.z.array(zod_1.z.object({}))
        .optional(),
    created_at: zod_1.z.date()
        .optional()
});
