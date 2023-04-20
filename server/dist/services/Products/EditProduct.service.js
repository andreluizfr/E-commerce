"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductService = void 0;
class EditProductService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(data) {
        const updatedProduct = await this.productsRepository.updateProduct(data.id, data.changes);
        return { updatedProduct: updatedProduct };
    }
}
exports.EditProductService = EditProductService;
