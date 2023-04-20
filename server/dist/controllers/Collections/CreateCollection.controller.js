"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCollection_service_1 = require("../../services/Collections/CreateCollection.service");
const Collections_repository_1 = require("../../repositories/Collections/Collections.repository");
const collectionsRepository = new Collections_repository_1.CollectionsRepository();
const createCollectionService = new CreateCollection_service_1.CreateCollectionService(collectionsRepository);
exports.default = new class CreateProductController {
    constructor() { }
    async handle(req, res) {
        const { title, description, products } = req.body;
        try {
            const { collection } = await createCollectionService.execute({ title, description, products });
            return res.status(201).send({
                refresh: false,
                success: true,
                collection: collection,
                message: "A coleção foi criada com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                collection: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
