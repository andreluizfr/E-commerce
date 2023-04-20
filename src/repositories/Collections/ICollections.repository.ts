import { Collection } from '../../entities/Collection.entity';

export interface ICollectionsRepository{
    createCollection(collection: Collection) : Promise <Collection>;
    deleteCollection(collectionId: string) : Promise <void>;
    updateCollection(collectionId: string, changes: object) : Promise <Collection | null>;
    findById(collectionId: string) : Promise <Collection | null>;
    getCollections() : Promise <Collection[]>;
}