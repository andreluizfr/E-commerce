import { IProductsRepository } from "../../repositories/Products/IProducts.repository";

interface IEditProductRequestDTO{
    id: string;
    changes: object;
}

//contains the business logic
export class EditProductService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private productsRepository: IProductsRepository){}

    async execute(data: IEditProductRequestDTO){
        
        const updatedProduct = await this.productsRepository.updateProduct(data.id, data.changes);
        return {updatedProduct: updatedProduct};

    }
    
}