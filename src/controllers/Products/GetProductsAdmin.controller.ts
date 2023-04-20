import { Request, Response,  } from 'express';
import { GetProductsAdminService } from '../../services/Products/GetProductsAdmin.service';
import { ProductsRepository } from "../../repositories/Products/Products.repository";

const productsRepository = new ProductsRepository();
const getProductsAdminService = new GetProductsAdminService(productsRepository);

interface Queries{
    category?: string | undefined;
    keyword?: string | undefined;
    productStatus?: string | undefined;
    order?: string | undefined;
}

//receive a request, calls the use-case, then send back a response
export default new class GetProductsAdminController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const category = req.query.categoria as (string | undefined);
        const keyword = req.query.keyword as (string | undefined);
        const productStatus = req.query.status as (string | undefined);
        const order = req.query.order as (string | undefined);

        const queries = {} as Queries;

        if(category)
            queries.category = category;
        
        if(keyword)
            queries.keyword = keyword;

        if(productStatus)
            queries.productStatus = productStatus;

        if(order)
            queries.order = order;


        try{
            const { products } = await getProductsAdminService.execute(queries);

            return res.status(201).send({
                refresh: false,
                success: true,
                products: products,
                message: "A busca foi um sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                products: [],
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}