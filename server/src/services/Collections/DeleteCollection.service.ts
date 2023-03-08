import { ICollectionsRepository } from "../../repositories/Collections/ICollections.repository";

//contains the business logic
export class DeleteCollectionService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private collectionsRepository: ICollectionsRepository){}

    async execute(collectionId: string){
        await this.collectionsRepository.deleteCollection(collectionId);
    }
    
}