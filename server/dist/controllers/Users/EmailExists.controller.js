"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailExists_service_1 = require("../../services/Users/EmailExists.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const emailExistsService = new EmailExists_service_1.EmailExistsService(usersRepository);
exports.default = new class EmailExistsController {
    constructor() { }
    async handle(req, res) {
        const { email } = req.body;
        try {
            const exists = await emailExistsService.execute({ email });
            return res.status(201).send({
                exists: exists,
                message: "E-mail procurado com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                exists: false,
                message: error.message || "Erro ao buscar e-mail. Por favor, tente mais tarde."
            });
        }
    }
};
