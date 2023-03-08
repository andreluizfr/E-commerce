import { Request, Response } from 'express';
import { CreateCollectionService } from '../../services/Collections/CreateCollection.service';
import { CollectionsRepository } from "../../repositories/Collections/Collections.repository";

const collectionsRepository = new CollectionsRepository();
const createCollectionService = new CreateCollectionService(collectionsRepository);

//receive a request, calls the use-case, then send back a response
export default new class CreateProductController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { title, description, products } = req.body;

        try{
            const { collection } = await createCollectionService.execute({ title, description, products });

            return res.status(201).send({
                refresh: false,
                success: true,
                collection: collection,
                message: "A coleção foi criada com sucesso."
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                collection: null,
                message: error.message || 'Unexpected error.'
            });

        } 

    } 

}