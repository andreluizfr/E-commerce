"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RefreshToken_service_1 = require("../../services/Users/RefreshToken.service");
const refreshTokenService = new RefreshToken_service_1.RefreshTokenService();
exports.default = new class RefreshTokenController {
    constructor() { }
    async handle(req, res) {
        const refreshToken = req.cookies.refreshToken;
        try {
            const { newAccessToken, newRefreshToken } = await refreshTokenService.execute(refreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXP || "604800000"))
            });
            return res.status(201).send({
                success: true,
                message: "Access token refreshed.",
                accessToken: newAccessToken
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                success: false,
                message: error.message || 'Unexpected error.',
                accessToken: null
            });
        }
    }
};
