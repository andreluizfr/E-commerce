import { IPaymentsRepository } from "../../repositories/Payments/IPayments.repository";
import { IOrdersRepository } from "../../repositories/Orders/IOrders.repository";

import { Payment } from "../../entities/Payment.entity";
import { Order } from "../../entities/Order.entity";

import MercadoPago from '../../helpers/mercadoPago';
import { Product } from "../../entities/Product.entity";

interface PaymentForm{
    token?: string | undefined;
    issuer_id?: string | undefined;
    payment_method_id: string;
    transaction_amount: number;
    installments: number;
    description?: string | undefined;
    payer: {
        email: string;
        identification: {
            type: string,
            number: string,
        }
    }
}

type Cart = {
    quantity: number,
    product: Product
}[]

//contains the business logic
export class CreatePaymentService{
    constructor (private paymentsRepository: IPaymentsRepository, private ordersRepository: IOrdersRepository){}

    async execute(paymentForm: PaymentForm, cart: Cart, userId: string){

        paymentForm.transaction_amount = Number(paymentForm.transaction_amount.toFixed(2));
        console.log(paymentForm);
        switch(paymentForm.payment_method_id){
            case 'pix': {
                const dateOfExpiration = new Date();
                dateOfExpiration.setDate(dateOfExpiration.getDate() + 1);  //1 dia para expirar o pix

                const response = await MercadoPago.payment.save({...paymentForm, date_of_expiration: String(dateOfExpiration)});
                const { payment_method_id, payment_type_id, status, status_detail, id, transaction_details, point_of_interaction } = response.body;
                
                const payment = new Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail:status_detail
                }, transaction_details, point_of_interaction.transaction_data);
                const createdPayment = await this.paymentsRepository.createPayment(payment);

                //create order
                const items = cart.map(productStatus=>{
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                })
                const order = new Order({user: userId, payment: createdPayment, items: items});
                const createdOrder = await this.ordersRepository.createOrder(order);

                return {order: createdOrder};

            }
            case 'bolbradesco': {
                const dateOfExpiration = new Date();
                dateOfExpiration.setDate(dateOfExpiration.getDate() + 3);  //3 dias para expirar boleto

                const response = await MercadoPago.payment.save(paymentForm);
                const { payment_method_id, payment_type_id, status, status_detail, id, transaction_details } = response.body;

                //create payment
                const payment = new Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail:status_detail
                }, transaction_details);
                const createdPayment = await this.paymentsRepository.createPayment(payment);

                //create order
                const items = cart.map(productStatus=>{
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                })
                const order = new Order({user: userId, payment: createdPayment, items: items});
                const createdOrder = await this.ordersRepository.createOrder(order);

                return {order: createdOrder};
            }
            default: { //'mastercard' | 'visa'
                const response = await MercadoPago.payment.save(paymentForm);
                const { payment_method_id, payment_type_id, status, status_detail, id } = response.body;

                //create payment
                const payment = new Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail:status_detail
                });
                const createdPayment = await this.paymentsRepository.createPayment(payment);

                //create order
                const items = cart.map(productStatus=>{
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                })
                const order = new Order({user: userId, payment: createdPayment, items: items});
                const createdOrder = await this.ordersRepository.createOrder(order);

                return {order: createdOrder};
            }
        }

        
    
       

    }
    
}