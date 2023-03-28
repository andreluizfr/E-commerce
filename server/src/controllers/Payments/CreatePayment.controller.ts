import { Request, Response } from 'express';
import { CreatePaymentService } from '../../services/Payments/CreatePayment.service';
import { PaymentsRepository } from "../../repositories/Payments/Payments.repository";
import { OrdersRepository } from "../../repositories/Orders/Orders.repository";

const paymentsRepository = new PaymentsRepository();
const ordersRepository = new OrdersRepository();
const createPaymentService = new CreatePaymentService(paymentsRepository, ordersRepository);

export default new class CreatePaymentController{
    constructor (){}

    async handle(req: Request, res: Response): Promise<Response>{

        const { paymentForm, cart, userId } = req.body;
        
        try{

            const { order } = await createPaymentService.execute(paymentForm, cart, userId);

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