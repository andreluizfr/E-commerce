import { ICollectionsRepository } from "../../repositories/Collections/ICollections.repository";

interface IEditCollectionRequestDTO{
    collectionId: string;
    changes: object;
}

//contains the business logic
export class EditCollectionService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private collectionsRepository: ICollectionsRepository){}

    async execute(data: IEditCollectionRequestDTO){
        
        const updatedCollection = await this.collectionsRepository.updateCollection(data.collectionId, data.changes);
        return {updatedCollection: updatedCollection};

    }
    
}