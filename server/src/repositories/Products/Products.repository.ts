import { Product } from "../../entities/Product.entity";
import { IProductsRepository } from "./IProducts.repository";
import { AppDataSource } from "../../database/data-source";
import { ArrayContains, Like } from "typeorm";

import { productDTO } from "./ProductDTO";

export class ProductsRepository implements IProductsRepository{

    async addProduct(product: Product){
        const parseResponse = productDTO.safeParse(product);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const productsRepository = AppDataSource.getRepository(Product);
        const createdProduct = await productsRepository.save(product);

        return createdProduct;
    };

    async removeProduct(product: Product){
        const productsRepository = AppDataSource.getRepository(Product);
        await productsRepository.remove(product);
    };

    async updateProduct(productId: string, changes: object){
        const productsRepository = AppDataSource.getRepository(Product);
        const product = await productsRepository.findOneBy({productId: productId});

        if (product){
            Object.assign(product, changes);

            const parseResponse = productDTO.safeParse(product);
            if(!parseResponse.success)
                throw new Error(parseResponse.error.issues[0].message);

            const updatedProduct = await productsRepository.save(product);
            return updatedProduct;
        } 
        else return null;
    }

    async updateRating(productId: string, rating: string){
        if(rating === ("1" || "2" || "3" || "4" || "5")){
            const productsRepository = AppDataSource.getRepository(Product);
            const product = await productsRepository.findOneBy({productId: productId});

            if (product){
                product.ratingNumbers[rating] += Number(rating);
                product.rating = Number(((
                    1*product.ratingNumbers["1"] +
                    2*product.ratingNumbers["2"] +
                    3*product.ratingNumbers["3"] +
                    4*product.ratingNumbers["4"] +
                    5*product.ratingNumbers["5"] 
                ) / 5).toFixed(2)); 
    
                const updatedProduct = await productsRepository.save(product);
                return updatedProduct;
            } else return null;

        } else return null;
        
    }

    async findById(productId: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findOneBy({productId: productId});
        
        return product;
    }

    async findByCategories(category: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findBy({category: category});
        
        return product;
    }

    async findByStatus(productStatus: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findBy({productStatus: productStatus});
        
        return product;
    }

    async findByKeyword(keyword: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const products = await productsRepository.find({
            where:[
                {title: Like(`%${keyword}%`)},
                {tags: ArrayContains([keyword])} 
            ]
        });
        
        return products;
    }

    async getAll(){
        const productsRepository = AppDataSource.getRepository(Product)
        const products = await productsRepository.find();
        
        return products;
    }

}