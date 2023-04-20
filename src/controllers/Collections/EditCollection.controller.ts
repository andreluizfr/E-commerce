import { Request, Response } from 'express';
import { EditCollectionService } from '../../services/Collections/EditCollection.service';
import { CollectionsRepository } from "../../repositories/Collections/Collections.repository";

const collectionsRepository = new CollectionsRepository();
const editCollectionService = new EditCollectionService(collectionsRepository);

//receive a request, calls the use-case, then send back a response
export default new class EditCollectionController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { collectionId, title, description, products} = req.body;
        
        const changes = { title, description, products };

        try{
            const { updatedCollection } = await editCollectionService.execute({collectionId, changes});

            return res.status(201).send({
                refresh: false,
                success: true,
                updatedCollection: updatedCollection,
                message: "A coleção foi atualizada com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                updatedCollection: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}