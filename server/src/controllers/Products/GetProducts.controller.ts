import { Request, Response,  } from 'express';
import { GetProductsService } from '../../services/Products/GetProducts.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const getProductsService = new GetProductsService(productsRepository);

interface Queries{
    category?: string | undefined;
    keyword?: string | undefined;
}

//receive a request, calls the use-case, then send back a response
export default new class GetProductsController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const category = req.query.categoria as (string | undefined);
        const keyword = req.query.keyword as (string | undefined);

        const queries = {} as Queries;

        if(category)
            queries.category = category;
        
        if(keyword)
            queries.keyword = keyword;

        try{
            const { products } = await getProductsService.execute(queries);

            return res.status(201).send({
                success: true,
                products: products,
                message: "A busca foi um sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                products: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}