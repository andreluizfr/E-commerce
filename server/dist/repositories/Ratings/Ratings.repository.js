"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsRepository = void 0;
const data_source_1 = require("../../database/data-source");
const Product_entity_1 = require("../../entities/Product.entity");
const typeorm_1 = require("typeorm");
const RatingDTO_1 = require("./RatingDTO");
class RatingsRepository {
    async addProduct(product) {
        const parseResponse = RatingDTO_1.ratingDTO.safeParse(product);
        if (!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const createdProduct = await productsRepository.save(product);
        return createdProduct;
    }
    ;
    async deleteProduct(productId) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        await productsRepository.delete({ id: productId });
    }
    ;
    async updateProduct(productId, changes) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productsRepository.findOneBy({ id: productId });
        if (product) {
            Object.assign(product, changes);
            const parseResponse = RatingDTO_1.ratingDTO.safeParse(product);
            if (!parseResponse.success)
                throw new Error(parseResponse.error.issues[0].message);
            const updatedProduct = await productsRepository.save(product);
            return updatedProduct;
        }
        else
            return null;
    }
    async findById(productId) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productsRepository.findOneBy({ id: productId });
        return product;
    }
    async findByCategories(category) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productsRepository.findBy({ category: category });
        return product;
    }
    async findByKeyword(keyword) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const products = await productsRepository.find({
            where: [
                { title: (0, typeorm_1.Like)(`%${keyword}%`) },
                { tags: (0, typeorm_1.ArrayContains)([keyword]) }
            ]
        });
        return products;
    }
    async getAll() {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const products = await productsRepository.find();
        return products;
    }
}
exports.RatingsRepository = RatingsRepository;
