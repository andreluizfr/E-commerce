import { Product } from '../../entities/Product.entity';

export interface IRatingsRepository{
    addProduct(user: Product) : Promise <Product>;
    deleteProduct(productId: string) : Promise <void>;
    updateProduct(productId: string, changes: object) : Promise <Product | null>;
    findById(productId: string) : Promise <Product | null>;
    findByCategories(category: string) : Promise <Product[]>;
    getAll() : Promise <Product[]>;
}