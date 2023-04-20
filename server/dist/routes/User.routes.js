"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const EmailExists_controller_1 = __importDefault(require("../controllers/Users/EmailExists.controller"));
const Login_controller_1 = __importDefault(require("../controllers/Users/Login.controller"));
const Signup_controller_1 = __importDefault(require("../controllers/Users/Signup.controller"));
const VerifyEmail_controller_1 = __importDefault(require("../controllers/Users/VerifyEmail.controller"));
const RefreshToken_controller_1 = __importDefault(require("../controllers/Users/RefreshToken.controller"));
const GetUser_controller_1 = __importDefault(require("../controllers/Users/GetUser.controller"));
const UpdateUser_controller_1 = __importDefault(require("../controllers/Users/UpdateUser.controller"));
const UpdateAddresses_controller_1 = __importDefault(require("../controllers/Users/UpdateAddresses.controller"));
const Auth_1 = require("../services/Auth");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/emailExists', (request, response) => {
    return EmailExists_controller_1.default.handle(request, response);
});
userRouter.post('/signup', (request, response) => {
    return Signup_controller_1.default.handle(request, response);
});
userRouter.post('/login', (request, response) => {
    return Login_controller_1.default.handle(request, response);
});
userRouter.post('/verifyEmail', (request, response) => {
    return VerifyEmail_controller_1.default.handle(request, response);
});
userRouter.get('/refreshToken', (request, response) => {
    return RefreshToken_controller_1.default.handle(request, response);
});
userRouter.get('/getUser', Auth_1.authentication, (request, response) => {
    return GetUser_controller_1.default.handle(request, response);
});
userRouter.post('/updateUser', Auth_1.authentication, (request, response) => {
    return UpdateUser_controller_1.default.handle(request, response);
});
userRouter.post('/updateAddresses', Auth_1.authentication, (request, response) => {
    return UpdateAddresses_controller_1.default.handle(request, response);
});
