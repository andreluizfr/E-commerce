"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsService = void 0;
class GetProductsService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(queries) {
        const products = await this.productsRepository.find(queries);
        return { products: products };
    }
}
exports.GetProductsService = GetProductsService;
