import { AppDataSource } from "../../database/data-source";
import { Product } from "../../entities/Product.entity";
import { IRatingsRepository } from "./IRatings.repository";
import { ArrayContains, Like } from "typeorm";
import { ratingDTO } from "./RatingDTO";


export class RatingsRepository implements IRatingsRepository{

    async addProduct(product: Product){
        const parseResponse = ratingDTO.safeParse(product);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const productsRepository = AppDataSource.getRepository(Product);
        const createdProduct = await productsRepository.save(product);

        return createdProduct;
    };

    async deleteProduct(productId: string){
        const productsRepository = AppDataSource.getRepository(Product);
        await productsRepository.delete({id: productId});
    };

    async updateProduct(productId: string, changes: object){
        const productsRepository = AppDataSource.getRepository(Product);
        const product = await productsRepository.findOneBy({id: productId});

        if (product){
            Object.assign(product, changes);

            const parseResponse = ratingDTO.safeParse(product);
            if(!parseResponse.success)
                throw new Error(parseResponse.error.issues[0].message);

            const updatedProduct = await productsRepository.save(product);
            return updatedProduct;
        } 
        else return null;
    }

    async findById(productId: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findOneBy({id: productId});
        
        return product;
    }

    async findByCategories(category: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findBy({category: category});
        
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