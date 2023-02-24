import { Router } from 'express';
import { Request, Response } from 'express';

import addProductController from '../controllers/Products/AddProduct.controller';

import { authentication, isAdmin } from '../services/Auth';

const productRouter = Router();

productRouter.post('/addProduct', authentication, isAdmin, (request: Request, response: Response)=>{
    return addProductController.handle(request, response);
});

export { productRouter };