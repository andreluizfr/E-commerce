"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteProduct_service_1 = require("../../services/Products/DeleteProduct.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const deleteProductService = new DeleteProduct_service_1.DeleteProductService(productsRepository);
exports.default = new class DeleteProductController {
    constructor() { }
    async handle(req, res) {
        const { productId } = req.body;
        try {
            await deleteProductService.execute(productId);
            return res.status(201).send({
                refresh: false,
                success: true,
                message: "O produto foi excluído com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
