import { Router } from 'express';
import { Request, Response } from 'express';

import loginController from '../controllers/Users/loginController';
import signupController from '../controllers/Users/signupController';
import verifyEmailController from '../controllers/Users/verifyEmailController';

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


/*
userRouter.get('/getPrivateInfo', authentication, (request: Request, response: Response)=>{
    return getPrivateUserInfoController.handle(request, response);
});
*/

export { userRouter };