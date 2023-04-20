"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupService = void 0;
const User_entity_1 = require("../../entities/User.entity");
const generateRandomString_1 = __importDefault(require("../../utils/generateRandomString"));
const sendEmail_1 = require("../../helpers/sendEmail");
class SignupService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        const verificationEmailCode = (0, generateRandomString_1.default)(30);
        const user = new User_entity_1.User(data, verificationEmailCode);
        const emailExists = await this.usersRepository.findByEmail(user.email);
        if (emailExists)
            throw new Error("E-mail já cadastrado.");
        const cpfExists = await this.usersRepository.findByCpf(user.cpf);
        if (cpfExists)
            throw new Error("CPF já cadastrado.");
        const createdUser = await this.usersRepository.createUser(user);
        try {
            await (0, sendEmail_1.sendVerificationLinkToEmail)(createdUser.email, verificationEmailCode);
        }
        catch (err) {
            const error = err;
            await this.usersRepository.deleteUser(createdUser.id);
            throw new Error('Verificação de e-mail não está funcionando. Por favor, tente mais tarde. ' + error.message);
        }
    }
}
exports.SignupService = SignupService;
