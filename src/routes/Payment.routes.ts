import { Router } from 'express';
import { Request, Response } from 'express';

import createPaymentController from '../controllers/Payments/CreatePayment.controller';

import { authentication } from '../services/Auth';

const paymentRouter = Router();

paymentRouter.post('/createPayment', authentication, (request: Request, response: Response)=>{
    return createPaymentController.handle(request, response);
});

export { paymentRouter };