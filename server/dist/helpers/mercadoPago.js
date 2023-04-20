"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = __importDefault(require("mercadopago"));
mercadopago_1.default.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "2848880495686725-032423-6170e1caacf3f2d838b937f4f69efbfa-1321642718"
});
exports.default = mercadopago_1.default;
