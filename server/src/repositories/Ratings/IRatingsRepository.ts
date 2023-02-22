import { Product } from '../../entities/Product';

export interface IProductsRepository{
    addProduct(user: Product) : Promise <Product>;
    removeProduct(user: Product) : Promise <void>;
    updateProduct(productId: string, changes: object) : Promise <Product | null>;
    findById(productId: string) : Promise <Product | null>;
    findByCategories(category: string) : Promise <Product | null>;
    getAll() : Promise <Product[]>;
}