"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyRefreshToken = exports.authentication = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_repository_1 = require("../../repositories/Users/Users.repository");
const IsAdmin_service_1 = require("../../services/Users/IsAdmin.service");
function createAccessToken(email) {
    const accessToken = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET || 'ssshhhhhhh', {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXP || "900000"
    });
    return accessToken;
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(email) {
    const refreshToken = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET || 'ssshhhhhhh', {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXP || "604800000"
    });
    return refreshToken;
}
exports.createRefreshToken = createRefreshToken;
function authentication(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.send({
            refresh: false,
            success: false,
            message: 'No token provided.'
        });
    const [, accessToken] = authHeader.split(" ");
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(accessToken, process.env.SECRET || 'ssshhhhhhh');
        req.body.email = jwtPayload.email;
        next();
    }
    catch (err) {
        const error = err;
        if (error.name === 'TokenExpiredError') {
            return res.send({
                refresh: true,
                success: false,
                message: 'You need to refresh your accessToken.'
            });
        }
        else {
            return res.send({
                refresh: false,
                success: false,
                login: true,
                message: 'Invalid access token, you need logging again.'
            });
        }
    }
}
exports.authentication = authentication;
function verifyRefreshToken(refreshToken) {
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET || 'ssshhhhhhh');
        return jwtPayload.email;
    }
    catch (err) {
        const error = err;
        if (error.name === 'TokenExpiredError') {
            throw new Error("Expired Refresh Token, please log in.");
        }
        throw new Error("Invalid Refresh Token, please log in.");
    }
}
exports.verifyRefreshToken = verifyRefreshToken;
async function isAdmin(req, res, next) {
    const usersRepository = new Users_repository_1.UsersRepository();
    const isAdminService = new IsAdmin_service_1.IsAdminService(usersRepository);
    try {
        const { email } = req.body;
        const isAdmin = await isAdminService.execute(email);
        if (isAdmin)
            next();
        else
            return res.status(202).send({
                refresh: false,
                success: false,
                message: 'Usuário não é administrador.',
            });
    }
    catch (err) {
        const error = err;
        return res.status(202).send({
            refresh: false,
            success: false,
            message: error.message || 'Unexpected error.',
        });
    }
}
exports.isAdmin = isAdmin;
