"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductService = void 0;
class DeleteProductService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(productId) {
        await this.productsRepository.deleteProduct(productId);
    }
}
exports.DeleteProductService = DeleteProductService;
