"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const express_1 = require("express");
const CreateCollection_controller_1 = __importDefault(require("../controllers/Collections/CreateCollection.controller"));
const DeleteCollection_controller_1 = __importDefault(require("../controllers/Collections/DeleteCollection.controller"));
const EditCollection_controller_1 = __importDefault(require("../controllers/Collections/EditCollection.controller"));
const FindCollectionById_controller_1 = __importDefault(require("../controllers/Collections/FindCollectionById.controller"));
const GetCollections_controller_1 = __importDefault(require("../controllers/Collections/GetCollections.controller"));
const Auth_1 = require("../services/Auth");
const collectionRouter = (0, express_1.Router)();
exports.collectionRouter = collectionRouter;
collectionRouter.post('/admin/createCollection', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return CreateCollection_controller_1.default.handle(request, response);
});
collectionRouter.put('/admin/deleteCollection', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return DeleteCollection_controller_1.default.handle(request, response);
});
collectionRouter.post('/admin/editCollection', Auth_1.authentication, Auth_1.isAdmin, (request, response) => {
    return EditCollection_controller_1.default.handle(request, response);
});
collectionRouter.get('/:collectionId', (request, response) => {
    return FindCollectionById_controller_1.default.handle(request, response);
});
collectionRouter.get('/', (request, response) => {
    return GetCollections_controller_1.default.handle(request, response);
});
