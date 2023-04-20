import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

//contains the business logic
export class DeleteProductService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(productId: string){
        await this.productsRepository.deleteProduct(productId);
    }
    
}