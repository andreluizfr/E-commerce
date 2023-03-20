import { Router } from 'express';
import { Request, Response } from 'express';

import emailExistsController from '../controllers/Users/EmailExists.controller';
import loginController from '../controllers/Users/Login.controller';
import signupController from '../controllers/Users/Signup.controller';
import verifyEmailController from '../controllers/Users/VerifyEmail.controller';
import refreshTokenController from '../controllers/Users/RefreshToken.controller';
import getUserController from '../controllers/Users/GetUser.controller';
import updateUserController from '../controllers/Users/UpdateUser.controller';

import { authentication } from '../services/Auth';

const userRouter = Router();

userRouter.post('/emailExists',(request: Request, response: Response)=>{
    return emailExistsController.handle(request, response);
});

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

userRouter.post('/updateUser', authentication, (request: Request, response: Response)=>{
    return updateUserController.handle(request, response);
});

export { userRouter };