import { Request, Response,  } from 'express';
import { GetCollectionsService } from '../../services/Collections/GetCollections.service';
import { CollectionsRepository } from "../../repositories/Collections/Collections.repository";

const collectionRepository = new CollectionsRepository();
const getCollectionsService = new GetCollectionsService(collectionRepository);

//receive a request, calls the use-case, then send back a response
export default new class GetCollectionsController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{

        try{
            const { collections } = await getCollectionsService.execute();

            return res.status(201).send({
                refresh: false,
                success: true,
                collections: collections,
                message: "A busca foi um sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                collections: [],
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}