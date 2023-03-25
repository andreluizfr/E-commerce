import { Collection } from "../../entities/Collection.entity";
import { ICollectionsRepository } from "./ICollections.repository";
import { AppDataSource } from "../../database/data-source";

import { collectionDTO } from "./CollectionDTO";


export class CollectionsRepository implements ICollectionsRepository{

    async createCollection(collection: Collection){
        collectionDTO.parse(collection);
        console.log(collection);
        const collectionsRepository = AppDataSource.getRepository(Collection);
        const createdCollection = await collectionsRepository.save(collection);

        return createdCollection;
    };

    async deleteCollection(collectionId: string){
        const collectionsRepository = AppDataSource.getRepository(Collection);
        await collectionsRepository.delete({id: collectionId});
    };

    async updateCollection(collectionId: string, changes: object){
        const collectionsRepository = AppDataSource.getRepository(Collection);
        const collection = await collectionsRepository.findOneBy({id: collectionId});

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
        const collections = await collectionsRepository.find({
            relations: {
                products: true
            },
            where:{
                id: collectionId
            }
        });
        
        return collections[0];
    }

    async getCollections(){
        const collectionsRepository = AppDataSource.getRepository(Collection)
        const collections = await collectionsRepository.find({
            relations: {
                products: true
            }
        });
        
        return collections;
    }

}