"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddProduct_service_1 = require("../../services/Products/AddProduct.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const addProductService = new AddProduct_service_1.AddProductService(productsRepository);
exports.default = new class AddProductController {
    constructor() { }
    async handle(req, res) {
        const { title, description, midias, price, comparisonPrice, costPerProduct, category, subcategory, providerURL, attributes, hasAttributes, productStatus, tags } = req.body;
        try {
            const { product } = await addProductService.execute({
                title, description, midias, price, comparisonPrice, costPerProduct, category,
                subcategory, providerURL, attributes, hasAttributes, productStatus, tags
            });
            return res.status(201).send({
                refresh: false,
                success: true,
                product: product,
                message: "O registro do produto foi um sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                product: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
