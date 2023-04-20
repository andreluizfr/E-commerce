"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetCollections_service_1 = require("../../services/Collections/GetCollections.service");
const Collections_repository_1 = require("../../repositories/Collections/Collections.repository");
const collectionRepository = new Collections_repository_1.CollectionsRepository();
const getCollectionsService = new GetCollections_service_1.GetCollectionsService(collectionRepository);
exports.default = new class GetCollectionsController {
    constructor() { }
    async handle(req, res) {
        try {
            const { collections } = await getCollectionsService.execute();
            return res.status(201).send({
                refresh: false,
                success: true,
                collections: collections,
                message: "A busca foi um sucesso."
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                collections: [],
                message: error.message || 'Unexpected error.'
            });
        }
    }
};
