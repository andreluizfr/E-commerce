"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCollectionService = void 0;
class DeleteCollectionService {
    collectionsRepository;
    constructor(collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }
    async execute(collectionId) {
        await this.collectionsRepository.deleteCollection(collectionId);
    }
}
exports.DeleteCollectionService = DeleteCollectionService;
