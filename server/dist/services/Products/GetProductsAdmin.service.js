"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsAdminService = void 0;
class GetProductsAdminService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(queries) {
        const products = await this.productsRepository.findAdmin(queries);
        return { products: products };
    }
}
exports.GetProductsAdminService = GetProductsAdminService;
