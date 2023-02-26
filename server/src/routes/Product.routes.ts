import { Router } from 'express';
import { Request, Response } from 'express';

import addProductController from '../controllers/Products/AddProduct.controller';
import deleteProductController from '../controllers/Products/DeleteProduct.controller';
import editProductController from '../controllers/Products/EditProduct.controller';
import findProductByIdController from '../controllers/Products/FindProductById.controller';
import getProductsController from '../controllers/Products/GetProducts.controller';
import getProductsAdminController from '../controllers/Products/GetProductsAdmin.controller';

import { authentication, isAdmin } from '../services/Auth';

const productRouter = Router();

productRouter.post('/admin/addProduct', authentication, isAdmin, (request: Request, response: Response)=>{
    return addProductController.handle(request, response);
});

productRouter.put('/admin/deleteProduct', authentication, isAdmin, (request: Request, response: Response)=>{
    return deleteProductController.handle(request, response);
});

productRouter.post('/admin/editProduct', authentication, isAdmin, (request: Request, response: Response)=>{
    return editProductController.handle(request, response);
});

productRouter.get('/admin', authentication, isAdmin, (request: Request, response: Response)=>{
    return getProductsAdminController.handle(request, response);
});

productRouter.get('/', (request: Request, response: Response)=>{
    return getProductsController.handle(request, response);
});

productRouter.get('/:productId', (request: Request, response: Response)=>{
    return findProductByIdController.handle(request, response);
});



export { productRouter };