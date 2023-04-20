import { ICollectionsRepository } from "../../repositories/Collections/ICollections.repository";

//contains the business logic
export class FindCollectionByIdService{
    //dependency inversion principle, depende apenas da interface e não da implementação dela
    constructor (private collectionsRepository: ICollectionsRepository){}

    async execute(collectionId: string){
        
        const collection = await this.collectionsRepository.findById(collectionId);

        if(collection) return {collection: collection};
        else throw new Error("Coleção não encontrada.");

    }
    
}