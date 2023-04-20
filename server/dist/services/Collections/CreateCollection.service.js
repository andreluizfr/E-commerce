"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCollectionService = void 0;
const Collection_entity_1 = require("../../entities/Collection.entity");
class CreateCollectionService {
    collectionsRepository;
    constructor(collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }
    async execute(data) {
        const collection = new Collection_entity_1.Collection(data);
        const createdCollection = await this.collectionsRepository.createCollection(collection);
        return { collection: createdCollection };
    }
}
exports.CreateCollectionService = CreateCollectionService;
