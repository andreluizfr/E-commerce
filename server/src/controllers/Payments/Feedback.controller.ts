import { Request, Response } from 'express';
import { FeedbackService } from '../../services/Payments/Feedback.service';
import { PaymentsRepository } from "../../repositories/Payments/Payments.repository";
import { OrdersRepository } from "../../repositories/Orders/Orders.repository";

const paymentsRepository = new PaymentsRepository();
const ordersRepository = new OrdersRepository();
const feedbackService = new FeedbackService(paymentsRepository, ordersRepository);

export default new class FeedbackController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{

        const paymentId = String(req.query.payment_id);
        const paymentStatus = String(req.query.status);
        const paymentType = String(req.query.payment_type);
        const preferenceId = String(req.query.preference_id);
        
        try{

            const { order } = await feedbackService.execute(paymentId, paymentStatus, paymentType, preferenceId)

            return res.status(201).send({
                refresh: false,
                success: true,
                message: "Pedido criado com sucesso.",
                order: order
            });

        } catch (err) {
            const error = err as Error;
            
            return res.status(202).send({
                refresh: false,
                success: false,
                message: error.message || "Falha ao criar pedido.",
                order: null
            });

        } 

    } 

}