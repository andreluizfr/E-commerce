import { IProductsRepository } from "../../repositories/Products/IProductsRepository";
import { ProductDTO } from "../../repositories/Products/ProductDTO";
import { Product }  from "../../entities/Product";

//contains the business logic
export class AddProductService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(data: ProductDTO){

        const product = new Product(data);
        
        const createdProduct = await this.productsRepository.addProduct(product);
        return {product: createdProduct};

    }
    
}