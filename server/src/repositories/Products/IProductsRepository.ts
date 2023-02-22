import { Product } from '../../entities/Product';

export interface IProductsRepository{
    addProduct(user: Product) : Promise <Product>;
    removeProduct(user: Product) : Promise <void>;
    updateProduct(productId: string, changes: object) : Promise <Product | null>;
    updateRating(productId: string, rating: string) : Promise <Product | null>;
    findById(productId: string) : Promise <Product | null>;
    findByCategories(category: string) : Promise <Product[]>;
    findByStatus(productStatus: string) : Promise <Product[]>;
    findByKeyword(keyword: string) : Promise <Product[]>;
    getAll() : Promise <Product[]>;
}