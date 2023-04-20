"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindProductByIdService = void 0;
class FindProductByIdService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(productId) {
        const product = await this.productsRepository.findById(productId);
        if (product)
            return { product: product };
        else
            throw new Error("Produto não encontrado.");
    }
}
exports.FindProductByIdService = FindProductByIdService;
