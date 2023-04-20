"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const AddProduct_controller_1 = __importDefault(require("../controllers/Products/AddProduct.controller"));
const DeleteProduct_controller_1 = __importDefault(require("../controllers/Products/DeleteProduct.controller"));
const EditProduct_controller_1 = __importDefault(require("../controllers/Products/EditProduct.controller"));
const FindProductById_controller_1 = __importDefault(require("../controllers/Products/FindProductById.controller"));
const GetProducts_controller_1 = __importDefault(require("../controllers/Products/GetProducts.controller"));
const GetProductsAdmin_controller_1 = __importDefault(require("../controllers/Products/GetProductsAdmin.controller"));
const Auth_1 = require("../services/Auth");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.post('/admin/addProduct', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return AddProduct_controller_1.default.handle(request, response);
});
productRouter.put('/admin/deleteProduct', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return DeleteProduct_controller_1.default.handle(request, response);
});
productRouter.post('/admin/editProduct', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return EditProduct_controller_1.default.handle(request, response);
});
productRouter.get('/admin', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return GetProductsAdmin_controller_1.default.handle(request, response);
});
productRouter.get('/', (request, response) => {
    return GetProducts_controller_1.default.handle(request, response);
});
productRouter.get('/:productId', (request, response) => {
    return FindProductById_controller_1.default.handle(request, response);
});
