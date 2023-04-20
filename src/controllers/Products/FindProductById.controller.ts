import { Request, Response } from 'express';
import { FindProductByIdService } from '../../services/Products/FindProductById.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const findProductByIdService = new FindProductByIdService(productsRepository);

//receive a request, calls the use-case, then send back a response
export default new class FindProductByIdController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const productId = req.params.productId;

        try{
            const { product } = await findProductByIdService.execute(productId);

            return res.status(201).send({
                success: true,
                product: product,
                message: "O produto foi encontrado com sucesso."
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