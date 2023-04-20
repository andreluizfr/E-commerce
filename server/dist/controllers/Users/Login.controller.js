"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Login_service_1 = require("../../services/Users/Login.service");
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const usersRepository = new Users_repository_1.UsersRepository();
const loginService = new Login_service_1.LoginService(usersRepository);
exports.default = new class LoginController {
    constructor() { }
    async handle(req, res) {
        const { email, password } = req.body;
        try {
            const { accessToken, refreshToken } = await loginService.execute({ email, password });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXP || "604800000"))
            });
            return res.status(201).send({
                success: true,
                message: "Login realizado com sucesso.",
                accessToken: accessToken,
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.',
                accessToken: null,
            });
        }
    }
};
