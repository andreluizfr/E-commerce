"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditCollection_service_1 = require("../../services/Collections/EditCollection.service");
const Collections_repository_1 = require("../../repositories/Collections/Collections.repository");
const collectionsRepository = new Collections_repository_1.CollectionsRepository();
const editCollectionService = new EditCollection_service_1.EditCollectionService(collectionsRepository);
exports.default = new class EditCollectionController {
    constructor() { }
    async handle(req, res) {
        const { collectionId, title, description, products } = req.body;
        const changes = { title, description, products };
        try {
            const { updatedCollection } = await editCollectionService.execute({ collectionId, changes });
            return res.status(201).send({
                refresh: false,
                success: true,
                updatedCollection: updatedCollection,
                message: "A coleção foi atualizada com sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedCollection: null,
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
