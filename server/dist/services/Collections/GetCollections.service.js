"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCollectionsService = void 0;
class GetCollectionsService {
    collectionsRepository;
    constructor(collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }
    async execute() {
        const collections = await this.collectionsRepository.getCollections();
        return { collections: collections };
    }
}
exports.GetCollectionsService = GetCollectionsService;
