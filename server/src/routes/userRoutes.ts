import { Router } from 'express';
import { Request, Response } from 'express';

import loginController from '../controllers/Users/LoginController';
import signupController from '../controllers/Users/SignupController';
import verifyEmailController from '../controllers/Users/VerifyEmailController';
import refreshTokenController from '../controllers/Users/RefreshTokenController';
import getUserController from '../controllers/Users/GetUserController';

import { authentication } from '../auth';

//import { authentication } from '../utils/auth';

const userRouter = Router();

userRouter.post('/signup', (request: Request, response: Response)=>{
    return signupController.handle(request, response);
});

userRouter.post('/login', (request: Request, response: Response)=>{
    return loginController.handle(request, response);
});

userRouter.post('/verifyEmail', (request: Request, response: Response)=>{
    return verifyEmailController.handle(request, response);
});

userRouter.get('/refreshToken', (request: Request, response: Response)=>{
    return refreshTokenController.handle(request, response);
});

userRouter.get('/getUser', authentication, (request: Request, response: Response)=>{
    return getUserController.handle(request, response);
});

export { userRouter };