import { Router } from 'express';
import { Request, Response } from 'express';

import createCollectionController from '../controllers/Collections/CreateCollection.controller';
import deleteCollectionController from '../controllers/Collections/DeleteCollection.controller';
import editCollectionController from '../controllers/Collections/EditCollection.controller';
import findCollectionByIdController from '../controllers/Collections/FindCollectionById.controller';
import getCollectionsController from '../controllers/Collections/GetCollections.controller';

import { authentication, isAdmin } from '../services/Auth';

const collectionRouter = Router();

collectionRouter.post('/admin/createCollection', authentication, isAdmin, (request: Request, response: Response)=>{
    return createCollectionController.handle(request, response);
});

collectionRouter.put('/admin/deleteCollection', authentication, isAdmin, (request: Request, response: Response)=>{
    return deleteCollectionController.handle(request, response);
});

collectionRouter.post('/admin/editCollection', authentication, isAdmin, (request: Request, response: Response)=>{
    return editCollectionController.handle(request, response);
});

collectionRouter.get('/:collectionId', (request: Request, response: Response)=>{
    return findCollectionByIdController.handle(request, response);
});

collectionRouter.get('/', (request: Request, response: Response)=>{
    return getCollectionsController.handle(request, response);
});


export { collectionRouter };