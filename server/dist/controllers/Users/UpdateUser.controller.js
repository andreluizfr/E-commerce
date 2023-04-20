"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateUser_service_1 = require("../../services/Users/UpdateUser.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const updateUserService = new UpdateUser_service_1.UpdateUserService(usersRepository);
exports.default = new class UpdateProductController {
    constructor() { }
    async handle(req, res) {
        const { userId, email, ...rest } = req.body;
        const changes = { ...rest };
        try {
            if (userId) {
                const { updatedUser } = await updateUserService.execute({ userId, changes, email });
                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedUser: updatedUser,
                    message: "O usuário foi atualizado com sucesso."
                });
            }
            else
                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedUser: null,
                    message: "Propriedade userId não foi informada."
                });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedUser: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
