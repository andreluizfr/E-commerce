import { ICollectionsRepository } from "../../repositories/Collections/ICollections.repository";

//contains the business logic
export class GetCollectionsService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private collectionsRepository: ICollectionsRepository){}

    async execute(){
        
        const collections = await this.collectionsRepository.getCollections();

        return {collections: collections};

    }
    
}