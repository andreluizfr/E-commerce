import { Router } from 'express';
import { Request, Response } from 'express';

import createPreferenceController from '../controllers/Payments/CreatePreference.controller';
import feedbackController from '../controllers/Payments/Feedback.controller';

import { authentication } from '../services/Auth';

const paymentRouter = Router();

paymentRouter.post('/createPreference', authentication, (request: Request, response: Response)=>{
    return createPreferenceController.handle(request, response);
});

paymentRouter.get('/feedback', (request: Request, response: Response)=>{
    return feedbackController.handle(request, response);
});

export { paymentRouter };