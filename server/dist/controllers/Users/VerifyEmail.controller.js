"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyEmail_service_1 = require("../../services/Users/VerifyEmail.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const verifyEmailService = new VerifyEmail_service_1.VerifyEmailService(usersRepository);
exports.default = new class SignupController {
    constructor() { }
    async handle(req, res) {
        const { verificationEmailCode } = req.body;
        try {
            await verifyEmailService.execute({ verificationEmailCode });
            return res.status(201).send({
                message: "E-mail verificado com sucesso.",
                success: true
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                message: error.message || 'Unexpected error.',
                success: false
            });
        }
    }
};
