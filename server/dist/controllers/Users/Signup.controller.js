"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Signup_service_1 = require("../../services/Users/Signup.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const signupService = new Signup_service_1.SignupService(usersRepository);
exports.default = new class SignupController {
    constructor() { }
    async handle(req, res) {
        const { firstName, lastName, email, birthDate, cpf, phoneNumber, password } = req.body;
        try {
            await signupService.execute({ firstName, lastName, email, birthDate, cpf, phoneNumber, password });
            return res.status(201).send({
                success: true,
                message: "O registro foi um sucesso, aguardando pela confirmação por e-mail."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
