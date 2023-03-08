import { Request, Response } from 'express';
import { DeleteCollectionService } from '../../services/Collections/DeleteCollection.service';
import { CollectionsRepository } from "../../repositories/Collections/Collections.repository";

const collectionsRepository = new CollectionsRepository();
const deleteCollectionService = new DeleteCollectionService(collectionsRepository);

//receive a request, calls the use-case, then send back a response
export default new class DeleteCollectionController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { collectionId } = req.body;

        try{
           await deleteCollectionService.execute(collectionId);

            return res.status(201).send({
                refresh: false,
                success: true,
                message: "A coleção foi excluída com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}