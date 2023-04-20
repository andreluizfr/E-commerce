"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsRepository = void 0;
const Collection_entity_1 = require("../../entities/Collection.entity");
const data_source_1 = require("../../database/data-source");
const CollectionDTO_1 = require("./CollectionDTO");
class CollectionsRepository {
    async createCollection(collection) {
        CollectionDTO_1.collectionDTO.parse(collection);
        console.log(collection);
        const collectionsRepository = data_source_1.AppDataSource.getRepository(Collection_entity_1.Collection);
        const createdCollection = await collectionsRepository.save(collection);
        return createdCollection;
    }
    ;
    async deleteCollection(collectionId) {
        const collectionsRepository = data_source_1.AppDataSource.getRepository(Collection_entity_1.Collection);
        await collectionsRepository.delete({ id: collectionId });
    }
    ;
    async updateCollection(collectionId, changes) {
        const collectionsRepository = data_source_1.AppDataSource.getRepository(Collection_entity_1.Collection);
        const collection = await collectionsRepository.findOneBy({ id: collectionId });
        if (collection) {
            Object.assign(collection, changes);
            CollectionDTO_1.collectionDTO.parse(collection);
            const updatedCollection = await collectionsRepository.save(collection);
            return updatedCollection;
        }
        else
            return null;
    }
    async findById(collectionId) {
        const collectionsRepository = data_source_1.AppDataSource.getRepository(Collection_entity_1.Collection);
        const collections = await collectionsRepository.find({
            relations: {
                products: true
            },
            where: {
                id: collectionId
            }
        });
        return collections[0];
    }
    async getCollections() {
        const collectionsRepository = data_source_1.AppDataSource.getRepository(Collection_entity_1.Collection);
        const collections = await collectionsRepository.find({
            relations: {
                products: true
            }
        });
        return collections;
    }
}
exports.CollectionsRepository = CollectionsRepository;
