"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FindCollectionById_service_1 = require("../../services/Collections/FindCollectionById.service");
const Collections_repository_1 = require("../../repositories/Collections/Collections.repository");
const collectionsRepository = new Collections_repository_1.CollectionsRepository();
const findCollectionByIdService = new FindCollectionById_service_1.FindCollectionByIdService(collectionsRepository);
exports.default = new class FindCollectionByIdController {
    constructor() { }
    async handle(req, res) {
        const collectionId = req.params.collectionId;
        try {
            const { collection } = await findCollectionByIdService.execute(collectionId);
            return res.status(201).send({
                success: true,
                collection: collection,
                message: "A coleção foi encontrada com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                success: false,
                collection: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
