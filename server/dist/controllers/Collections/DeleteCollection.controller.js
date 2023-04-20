"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteCollection_service_1 = require("../../services/Collections/DeleteCollection.service");
const Collections_repository_1 = require("../../repositories/Collections/Collections.repository");
const collectionsRepository = new Collections_repository_1.CollectionsRepository();
const deleteCollectionService = new DeleteCollection_service_1.DeleteCollectionService(collectionsRepository);
exports.default = new class DeleteCollectionController {
    constructor() { }
    async handle(req, res) {
        const { collectionId } = req.body;
        try {
            await deleteCollectionService.execute(collectionId);
            return res.status(201).send({
                refresh: false,
                success: true,
                message: "A coleção foi excluída com sucesso."
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
