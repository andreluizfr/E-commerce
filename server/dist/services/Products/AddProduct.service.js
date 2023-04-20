"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductService = void 0;
const Product_entity_1 = require("../../entities/Product.entity");
class AddProductService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(data) {
        const product = new Product_entity_1.Product(data);
        const createdProduct = await this.productsRepository.addProduct(product);
        return { product: createdProduct };
    }
}
exports.AddProductService = AddProductService;
