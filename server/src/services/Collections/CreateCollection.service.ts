import { ICollectionsRepository } from "../../repositories/Collections/ICollections.repository";
import { CollectionDTO } from "../../repositories/Collections/CollectionDTO";
import { Collection }  from "../../entities/Collection.entity";

//contains the business logic
export class CreateCollectionService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private collectionsRepository: ICollectionsRepository){}

    async execute(data: CollectionDTO){

        const collection = new Collection(data);
        
        const createdCollection = await this.collectionsRepository.createCollection(collection);
        return {collection: createdCollection};

    }
    
}