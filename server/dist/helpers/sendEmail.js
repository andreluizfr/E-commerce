"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationLinkToEmail = exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
async function sendVerificationLinkToEmail(email, verificationCode) {
    const verificationLink = (process.env.BASE_URL_WEB_APP || 'http://localhost:3000') + '/verificacao/' + verificationCode;
    await exports.transport.sendMail({
        from: '<noreplay@loja.com>',
        to: email,
        subject: "Verificação de e-mail na loja",
        text: "Se criou uma nova conta na loja, clique no link abaixo para verificar seu e-mail: " + verificationLink,
        html: "<div><h1><b>Confirme seu endereço de e-mail</b></h1></div><div>Se criou uma nova conta na loja, clique no link abaixo para verificar seu e-mail:</div><div><h2>"
            + verificationLink +
            "</h2></div>",
    });
}
exports.sendVerificationLinkToEmail = sendVerificationLinkToEmail;
