"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const Auth_1 = require("../../services/Auth");
const bcrypt = __importStar(require("bcrypt"));
const zod_1 = require("zod");
const loginRequestDTO = zod_1.z.object({
    email: zod_1.z.string({ required_error: "E-mail não informado." }),
    password: zod_1.z.string({ required_error: "Senha não informada." })
});
class LoginService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        const parseResponse = loginRequestDTO.safeParse(data);
        if (!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);
        const user = await this.usersRepository.findByEmail(data.email);
        if (user) {
            const isMatch = await bcrypt.compare(data.password, user.password);
            if (isMatch) {
                if (user.emailVerified) {
                    const accessToken = (0, Auth_1.createAccessToken)(data.email);
                    const refreshToken = (0, Auth_1.createRefreshToken)(data.email);
                    return { accessToken: accessToken, refreshToken: refreshToken };
                }
                else
                    throw new Error("Aguardando verificação por e-mail.");
            }
            else
                throw new Error("E-mail ou senha incorreta.");
        }
        else
            throw new Error("E-mail ou senha incorreta.");
    }
}
exports.LoginService = LoginService;
