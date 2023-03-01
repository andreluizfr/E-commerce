import { Product } from "../../entities/Product.entity";
import { IProductsRepository } from "./IProducts.repository";
import { AppDataSource } from "../../database/data-source";
import { ArrayContains, FindOptionsOrderValue, Like } from "typeorm";

import { productDTO } from "./ProductDTO";

interface Queries{
    category?: string | undefined;
    keyword?: string | undefined;
    productStatus?: string | undefined;
    order?: FindOptionsOrderValue | undefined;
}

export class ProductsRepository implements IProductsRepository{

    async addProduct(product: Product){
        const parseResponse = productDTO.safeParse(product);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        console.log(product);
        const productsRepository = AppDataSource.getRepository(Product);
        const createdProduct = await productsRepository.save(product);

        return createdProduct;
    };

    async deleteProduct(productId: string){
        const productsRepository = AppDataSource.getRepository(Product);
        await productsRepository.delete({productId: productId});
    };

    async updateProduct(productId: string, changes: object){
        const productsRepository = AppDataSource.getRepository(Product);
        const product = await productsRepository.findOneBy({productId: productId});

        if (product){
            Object.assign(product, changes);

            if(Object.hasOwn(changes, "ratingNumbers")){
                product.rating = Number(((
                    1*product.ratingNumbers["1"] +
                    2*product.ratingNumbers["2"] +
                    3*product.ratingNumbers["3"] +
                    4*product.ratingNumbers["4"] +
                    5*product.ratingNumbers["5"] 
                ) / 5).toFixed(2)); 
            }

            const parseResponse = productDTO.safeParse(product);
            if(!parseResponse.success)
                throw new Error(parseResponse.error.issues[0].message);

            const updatedProduct = await productsRepository.save(product);
            return updatedProduct;
        } 
        else return null;
    }

    async findById(productId: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findOneBy({productId: productId});
        
        return product;
    }

    async find(queries: Queries){
        const productsRepository = AppDataSource.getRepository(Product)

        const where = [
            {
                category: queries.category,
                title: Like(`%${queries.keyword}%`)
            },
            {
                category: queries.category,
                tags: ArrayContains([queries.keyword])
            }
        ];

        if(!queries.category){
            delete where[0].category;
            delete where[1].category;
        }
        if(!queries.keyword){
            delete where[0].title;
            delete where[1].tags;
            where.pop();
        }

        if(Object.keys(where[0]).length === 0)
            where.pop();

        let products = [] as Product[];
        if(where.length > 0)
            products = await productsRepository.find({
                where: where
            });
        else
            products = await productsRepository.find();
        
        return products;
    }

    async findAdmin(queries: Queries){
        const productsRepository = AppDataSource.getRepository(Product)

        const where = [
            {
                productStatus: queries.productStatus,
                category: queries.category,
                title: Like(`%${queries.keyword}%`)
            },
            {
                productStatus: queries.productStatus,
                category: queries.category,
                tags: ArrayContains([queries.keyword])
            }
        ];

        if(!queries.productStatus){
            delete where[0].productStatus;
            delete where[1].productStatus;
        }
        if(!queries.category){
            delete where[0].category;
            delete where[1].category;
        }
        if(!queries.keyword){
            delete where[0].title;
            delete where[1].tags;
            where.pop();
        }

        if(Object.keys(where[0]).length === 0)
            where.pop();

        let products = [] as Product[];
        if(where.length > 0)
            products = await productsRepository.find({
                where: where,
                order: {
                    productId: queries.order
                }
            });
        else
            products = await productsRepository.find({
                order: {
                    productId: queries.order
                }
            });
        
        return products;
    }

}