import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/Products/DeleteProduct.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const deleteProductService = new DeleteProductService(productsRepository);

//receive a request, calls the use-case, then send back a response
export default new class DeleteProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { productId } = req.body;

        try{
           await deleteProductService.execute(productId);

            return res.status(201).send({
                authenticated: true,
                success: true,
                message: "O produto foi excluído com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                authenticated: true,
                success: false,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}