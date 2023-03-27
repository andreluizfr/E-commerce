import { Request, Response } from 'express';
import { CreatePreferenceService } from '../../services/Payments/CreatePreference.service';

const createPreferenceService = new CreatePreferenceService();

export default new class CreatePreferenceController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{
        
        const { cart, userId } = req.body;

        if(cart && userId){
            try{

                const { preferenceId } = await createPreferenceService.execute(cart, userId);

                return res.status(201).send({
                    refresh: false,
                    success: true,
                    preferenceId: preferenceId,
                    message: 'Criação de preferencias bem sucedida.'
                });

            } catch (err) {
                const error = err as Error;
                
                return res.status(202).send({
                    refresh: false,
                    success: false,
                    preferenceId: null,
                    message: error.message || 'Unexpected error.'
                });

            } 

        }

        else
            return res.status(202).send({
                refresh: false,
                success: false,
                preferenceId: null,
                message: 'Você não pode pagar sem ter produtos no carrinho ou sem informar o Id do usuário.'
            });
    } 

}