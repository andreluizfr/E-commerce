import { Router } from 'express';
import { Request, Response } from 'express';

import addProductController from '../controllers/Products/AddProductController';

import { authentication } from '../auth';

const productRouter = Router();

productRouter.post('/addProduct', authentication, (request: Request, response: Response)=>{
    return addProductController.handle(request, response);
});

export { productRouter };