import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

interface Queries{
    category?: string | undefined;
    keyword?: string | undefined;
    productStatus?: string | undefined;
}

//contains the business logic
export class GetProductsAdminService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(queries: Queries){
        
        const products = await this.productsRepository.findAdmin(queries);

        return {products: products};

    }
    
}