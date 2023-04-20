"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FindProductById_service_1 = require("../../services/Products/FindProductById.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const findProductByIdService = new FindProductById_service_1.FindProductByIdService(productsRepository);
exports.default = new class FindProductByIdController {
    constructor() { }
    async handle(req, res) {
        const productId = req.params.productId;
        try {
            const { product } = await findProductByIdService.execute(productId);
            return res.status(201).send({
                success: true,
                product: product,
                message: "O produto foi encontrado com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                success: false,
                product: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
