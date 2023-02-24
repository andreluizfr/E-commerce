import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

interface IEditProductRequestDTO{
    productId: string;
    changes: object;
}

//contains the business logic
export class EditProductService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(data: IEditProductRequestDTO){
        
        const updatedProduct = await this.productsRepository.updateProduct(data.productId, data.changes);
        return {updatedProduct: updatedProduct};

    }
    
}