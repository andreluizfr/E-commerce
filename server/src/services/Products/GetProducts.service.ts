import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

interface Queries{
    category?: string | undefined;
    keyword?: string | undefined;
}

//contains the business logic
export class GetProductsService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(queries: Queries){
        
        const products = await this.productsRepository.find(queries);

        return {products: products};

    }
    
}