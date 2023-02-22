import { Request, Response } from 'express';
import { AddProductService } from '../../services/Products/AddProductService';
import { ProductsRepository } from "../../repositories/Products/ProductsRepository";

const productsRepository = new ProductsRepository();
const addProductService = new AddProductService(productsRepository);

//receive a request, calls the use-case, then send back a response
export default new class AddProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers } = req.body;

        try{
            const { product } = await addProductService.execute({ 
                title, description, midias, price, comparisonPrice, costPerProduct, category,
                providerURL, attributes, productStatus, ratingNumbers });

            return res.status(201).send({
                success: true,
                product: product,
                message: "O registro do produto foi um sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                product: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}