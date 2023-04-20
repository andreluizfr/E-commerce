"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const Product_entity_1 = require("../../entities/Product.entity");
const data_source_1 = require("../../database/data-source");
const typeorm_1 = require("typeorm");
const ProductDTO_1 = require("./ProductDTO");
class ProductsRepository {
    async addProduct(product) {
        ProductDTO_1.productDTO.parse(product);
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
    async updateProduct(id, changes) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productsRepository.findOneBy({ id: id });
        if (product) {
            Object.assign(product, changes);
            if (Object.hasOwn(changes, "ratingNumbers")) {
                product.rating = Number(((1 * product.ratingNumbers["1"] +
                    2 * product.ratingNumbers["2"] +
                    3 * product.ratingNumbers["3"] +
                    4 * product.ratingNumbers["4"] +
                    5 * product.ratingNumbers["5"]) / 5).toFixed(2));
            }
            ProductDTO_1.productDTO.parse(product);
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
    async find(queries) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const where = [
            {
                productStatus: "ativo",
                category: queries.category,
                title: (0, typeorm_1.Like)(`%${queries.keyword}%`)
            },
            {
                productStatus: "ativo",
                category: queries.category,
                tags: (0, typeorm_1.ArrayContains)([queries.keyword])
            }
        ];
        if (!queries.category) {
            delete where[0].category;
            delete where[1].category;
        }
        if (!queries.keyword) {
            delete where[0].title;
            delete where[1].tags;
            where.pop();
        }
        if (Object.keys(where[0]).length === 0)
            where.pop();
        let products = [];
        if (where.length > 0)
            products = await productsRepository.find({
                where: where,
                order: {
                    created_at: queries.order
                }
            });
        else
            products = await productsRepository.find({
                where: {
                    productStatus: "ativo"
                },
                order: {
                    created_at: queries.order
                }
            });
        return products;
    }
    async findAdmin(queries) {
        const productsRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const where = [
            {
                productStatus: queries.productStatus,
                category: queries.category,
                title: (0, typeorm_1.Like)(`%${queries.keyword}%`)
            },
            {
                productStatus: queries.productStatus,
                category: queries.category,
                tags: (0, typeorm_1.ArrayContains)([queries.keyword])
            }
        ];
        if (!queries.productStatus) {
            delete where[0].productStatus;
            delete where[1].productStatus;
        }
        if (!queries.category) {
            delete where[0].category;
            delete where[1].category;
        }
        if (!queries.keyword) {
            delete where[0].title;
            delete where[1].tags;
            where.pop();
        }
        if (Object.keys(where[0]).length === 0)
            where.pop();
        let products = [];
        if (where.length > 0)
            products = await productsRepository.find({
                where: where,
                order: {
                    id: queries.order
                }
            });
        else
            products = await productsRepository.find({
                order: {
                    id: queries.order
                }
            });
        return products;
    }
}
exports.ProductsRepository = ProductsRepository;
