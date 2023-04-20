"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditProduct_service_1 = require("../../services/Products/EditProduct.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const editProductService = new EditProduct_service_1.EditProductService(productsRepository);
exports.default = new class EditProductController {
    constructor() { }
    async handle(req, res) {
        const { id, title, description, midias, price, comparisonPrice, costPerProduct, category, providerURL, attributes, productStatus, ratingNumbers, sales } = req.body;
        const changes = { title, description, midias, price, comparisonPrice, costPerProduct, category,
            providerURL, attributes, productStatus, ratingNumbers, sales };
        try {
            if (id) {
                const { updatedProduct } = await editProductService.execute({ id, changes });
                return res.status(201).send({
                    refresh: false,
                    success: true,
                    updatedProduct: updatedProduct,
                    message: "O produto foi atualizado com sucesso."
                });
            }
            else {
                return res.status(201).send({
                    refresh: false,
                    success: false,
                    updatedProduct: null,
                    message: "Não chegou a especificação de qual produto."
                });
            }
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedProduct: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
