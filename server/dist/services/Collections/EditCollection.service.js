"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCollectionService = void 0;
class EditCollectionService {
    collectionsRepository;
    constructor(collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }
    async execute(data) {
        const updatedCollection = await this.collectionsRepository.updateCollection(data.collectionId, data.changes);
        return { updatedCollection: updatedCollection };
    }
}
exports.EditCollectionService = EditCollectionService;
