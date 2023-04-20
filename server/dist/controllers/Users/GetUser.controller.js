"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetUser_service_1 = require("../../services/Users/GetUser.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const getUserService = new GetUser_service_1.GetUserService(usersRepository);
exports.default = new class GetUserController {
    constructor() { }
    async handle(req, res) {
        const { email } = req.body;
        try {
            const { user } = await getUserService.execute(email);
            const publicUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthDate: user.birthDate,
                cpf: user.cpf,
                phoneNumber: user.phoneNumber,
                emailVerified: user.emailVerified,
                admin: user.admin,
                addresses: user.addresses,
                photoURL: user.photoURL,
                orders: user.orders,
                ratings: user.ratings,
                created_at: user.created_at
            };
            return res.status(201).send({
                refresh: false,
                success: true,
                message: "Usuário buscado com sucesso.",
                user: publicUser
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                message: error.message || 'Unexpected error.',
                user: null
            });
        }
    }
};
