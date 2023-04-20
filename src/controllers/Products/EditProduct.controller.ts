import { Request, Response } from 'express';
import { EditProductService } from '../../services/Products/EditProduct.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const editProductService = new EditProductService(productsRepository);

//receive a request, calls the use-case, then send back a response
export default new class EditProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { id, title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers, sales } = req.body;
        
        const changes = { title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers, sales };

        try{
            if(id){
                const { updatedProduct } = await editProductService.execute({id, changes});

                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedProduct: updatedProduct,
                    message: "O produto foi atualizado com sucesso."
                });
            } else {
                return res.status(201).send({
                    refresh: false,
                    success: false,
                    updatedProduct: null,
                    message: "Não chegou a especificação de qual produto."
                });
            }

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedProduct: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}