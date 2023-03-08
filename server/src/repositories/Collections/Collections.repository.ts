import { Collection } from "../../entities/Collection.entity";
import { ICollectionsRepository } from "./ICollections.repository";
import { AppDataSource } from "../../database/data-source";
import { ArrayContains, FindOptionsOrderValue, Like } from "typeorm";

import { collectionDTO } from "./CollectionDTO";


export class CollectionsRepository implements ICollectionsRepository{

    async createCollection(collection: Collection){
        collectionDTO.parse(collection);

        const collectionsRepository = AppDataSource.getRepository(Collection);
        const createdCollection = await collectionsRepository.save(collection);

        return createdCollection;
    };

    async deleteCollection(collectionId: string){
        const collectionsRepository = AppDataSource.getRepository(Collection);
        await collectionsRepository.delete({collectionId: collectionId});
    };

    async updateCollection(collectionId: string, changes: object){
        const collectionsRepository = AppDataSource.getRepository(Collection);
        const collection = await collectionsRepository.findOneBy({collectionId: collectionId});

        if (collection){
            Object.assign(collection, changes);

            collectionDTO.parse(collection);

            const updatedCollection = await collectionsRepository.save(collection);
            return updatedCollection;
        } 
        else return null;
    }

    async findById(collectionId: string){
        const collectionsRepository = AppDataSource.getRepository(Collection)
        const collection = await collectionsRepository.findOneBy({collectionId: collectionId});
        
        return collection;
    }

    async getCollections(){
        const collectionsRepository = AppDataSource.getRepository(Collection)
        const collections = await collectionsRepository.find();
        
        return collections;
    }

}