"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCollectionByIdService = void 0;
class FindCollectionByIdService {
    collectionsRepository;
    constructor(collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }
    async execute(collectionId) {
        const collection = await this.collectionsRepository.findById(collectionId);
        if (collection)
            return { collection: collection };
        else
            throw new Error("Coleção não encontrada.");
    }
}
exports.FindCollectionByIdService = FindCollectionByIdService;
