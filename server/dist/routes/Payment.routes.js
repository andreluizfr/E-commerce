"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const CreatePayment_controller_1 = __importDefault(require("../controllers/Payments/CreatePayment.controller"));
const Auth_1 = require("../services/Auth");
const paymentRouter = (0, express_1.Router)();
exports.paymentRouter = paymentRouter;
paymentRouter.post('/createPayment', Auth_1.authentication, (request, response) => {
    return CreatePayment_controller_1.default.handle(request, response);
});
