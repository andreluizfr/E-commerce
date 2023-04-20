"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetProducts_service_1 = require("../../services/Products/GetProducts.service");
const Products_repository_1 = require("../../repositories/Products/Products.repository");
const productsRepository = new Products_repository_1.ProductsRepository();
const getProductsService = new GetProducts_service_1.GetProductsService(productsRepository);
exports.default = new class GetProductsController {
    constructor() { }
    async handle(req, res) {
        const category = req.query.categoria;
        const keyword = req.query.keyword;
        const order = req.query.ordem;
        const queries = {};
        if (category)
            queries.category = category;
        if (keyword)
            queries.keyword = keyword;
        if (order)
            queries.order = order;
        try {
            const { products } = await getProductsService.execute(queries);
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
