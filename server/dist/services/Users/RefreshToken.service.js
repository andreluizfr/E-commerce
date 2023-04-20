"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const Auth_1 = require("../../services/Auth");
class RefreshTokenService {
    constructor() { }
    async execute(refreshToken) {
        const email = (0, Auth_1.verifyRefreshToken)(refreshToken);
        const newRefreshToken = (0, Auth_1.createRefreshToken)(email);
        const newAccessToken = (0, Auth_1.createAccessToken)(email);
        return { newAccessToken: newAccessToken, newRefreshToken: newRefreshToken };
    }
}
exports.RefreshTokenService = RefreshTokenService;
