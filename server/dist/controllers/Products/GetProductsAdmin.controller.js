"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetProductsAdmin_service_1 = require("../../services/Products/GetProductsAdmin.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const getProductsAdminService = new GetProductsAdmin_service_1.GetProductsAdminService(productsRepository);
exports.default = new class GetProductsAdminController {
    constructor() { }
    async handle(req, res) {
        const category = req.query.categoria;
        const keyword = req.query.keyword;
        const productStatus = req.query.status;
        const order = req.query.order;
        const queries = {};
        if (category)
            queries.category = category;
        if (keyword)
            queries.keyword = keyword;
        if (productStatus)
            queries.productStatus = productStatus;
        if (order)
            queries.order = order;
        try {
            const { products } = await getProductsAdminService.execute(queries);
            return res.status(201).send({
                refresh: false,
                success: true,
                products: products,
                message: "A busca foi um sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                products: [],
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
