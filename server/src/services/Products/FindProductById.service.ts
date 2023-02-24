import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

//contains the business logic
export class FindProductByIdService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(productId: string){
        
        const product = await this.productsRepository.findById(productId);

        if(product) return {product: product};
        else throw new Error("Produto não encontrado.");


    }
    
}