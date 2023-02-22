import { Product } from "../../entities/Product";
import { IProductsRepository } from "./IProductsRepository";
import { AppDataSource } from "../../database/postgres";
import { ArrayContains, Like } from "typeorm";

import { z } from "zod";
import Category from '../../types/Category';
import ProductStatus from '../../types/ProductStatus';


const productDTO = z.object({
    title: z.string({required_error: "Título do produto não informado."}),
    description: z.string()
        .optional()
        .nullable(),
    midias: z.array(z.object({
            attributeValue: z.string().nullable(),
            type: z.string(),
            url: z.string().url({ message: "url inválida" })
        }))
        .optional()
        .nullable(),
    price: z.number()
        .optional()
        .nullable(),
    comparisonPrice: z.number()
        .optional()
        .nullable(),
    costPerProduct: z.number()
        .refine(cost => cost.toFixed(2))
        .optional()
        .nullable(),
    category: z.custom<{arg: Category}>()
        .optional()
        .nullable(),
    subCategory: z.string() //trocar pra tipo de subcategorias depois
        .optional()
        .nullable(),
    providerURL: z.string()
        .url({ message: "url inválida" })
        .optional()
        .nullable(),
    hasAttributes: z.boolean({required_error: "É necessário informar se produto possui atributos."}),
    attributes: z.array(z.object({
        name: z.string({required_error: "Nome do atributo precisa ser informado."}),
        values: z.array(z.string({required_error: "Lista com valores do atributo precisam ser informados."})
            .min(1, {message: "A lista dos valores não pode ser vazia."})
        )}))
        .optional()
        .nullable(),
    productStatus: z.custom<{arg: ProductStatus}>(),
    rating: z.number()
        .refine(cost => cost.toFixed(2))
        .optional()
        .nullable(),
    ratingNumbers: z.object({
        "1": z.number(),
        "2": z.number(),
        "3": z.number(),
        "4": z.number(),
        "5": z.number()
    })
    .optional()
    .nullable(),
    tags: z.array(z.string())
        .optional()
        .nullable()
});

//type UserDTO = z.infer<typeof userDTO>;

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

    async findById(productId: string){
        const productsRepository = AppDataSource.getRepository(Product)
        const product = await productsRepository.findOneBy({productId: productId});
        
        return product;
    }

    async findByCategories(category: Category){
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