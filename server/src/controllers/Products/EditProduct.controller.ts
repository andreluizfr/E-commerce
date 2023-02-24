import { Request, Response } from 'express';
import { EditProductService } from '../../services/Products/EditProduct.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const editProductService = new EditProductService(productsRepository);

//receive a request, calls the use-case, then send back a response
export default new class EditProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { productId, title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers } = req.body;
        
        const changes = { title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers };

        try{
            const { updatedProduct } = await editProductService.execute({productId, changes});

            return res.status(201).send({
                authenticated: true,
                success: true,
                updatedProduct: updatedProduct,
                message: "O produto foi atualizado com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                authenticated: true,
                success: false,
                updatedProduct: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}