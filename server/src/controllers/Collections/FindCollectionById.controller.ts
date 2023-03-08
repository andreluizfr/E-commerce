import { Request, Response } from 'express';
import { FindCollectionByIdService } from '../../services/Collections/FindCollectionById.service';
import { CollectionsRepository } from "../../repositories/Collections/Collections.repository";

const collectionsRepository = new CollectionsRepository();
const findCollectionByIdService = new FindCollectionByIdService(collectionsRepository);

//receive a request, calls the use-case, then send back a response
export default new class FindCollectionByIdController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const collectionId = req.params.collectionId;

        try{
            const { collection } = await findCollectionByIdService.execute(collectionId);

            return res.status(201).send({
                success: true,
                collection: collection,
                message: "A coleção foi encontrada com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                success: false,
                collection: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}