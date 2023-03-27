import { IPaymentsRepository } from "../../repositories/Payments/IPayments.repository";
import { IOrdersRepository } from "../../repositories/Orders/IOrders.repository";

import { Payment } from "../../entities/Payment.entity";
import { Order } from "../../entities/Order.entity";

import MercadoPago from '../../helpers/mercadoPago';


//contains the business logic
export class FeedbackService{
    constructor (private paymentsRepository: IPaymentsRepository, private ordersRepository: IOrdersRepository){}

    async execute(paymentId: string, paymentStatus: string, paymentType: string, preferenceId: string){

        const response = await MercadoPago.preferences.findById(preferenceId);

        const items = response.body.items as {
            title: string, 
            unit_price: number,
            quantity: number
        }[];
        const userId = response.body.additional_info.userId as string;
    
        //create payment
        const payment = new Payment({id: paymentId, preferenceId: preferenceId, status: paymentStatus, type: paymentType, });
        const createdPayment = await this.paymentsRepository.createPayment(payment);

        //create order
        const order = new Order({user: userId, payment: createdPayment, items: items});
        const createdOrder = await this.ordersRepository.createOrder(order);

        return {order: createdOrder}

    }
    
}