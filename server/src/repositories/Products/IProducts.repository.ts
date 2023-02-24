import { Product } from '../../entities/Product.entity';

interface Queries{
    category?: string;
    keyword?: string;
    productStatus?: string | undefined;
}
export interface IProductsRepository{
    addProduct(user: Product) : Promise <Product>;
    deleteProduct(productId: string) : Promise <void>;
    updateProduct(productId: string, changes: object) : Promise <Product | null>;
    findById(productId: string) : Promise <Product | null>;
    find(queries: Queries) : Promise <Product[]>;
    findAdmin(queries: Queries) : Promise <Product[]>;
}