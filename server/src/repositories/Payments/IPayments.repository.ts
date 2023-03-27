import {Payment} from '../../entities/Payment.entity';

export interface IPaymentsRepository{
    createPayment(payment: Payment) : Promise <Payment>;
    updatePaymentStatus(paymentId: string, status: string) : Promise <Payment | null>;
    findById(paymentId: string) : Promise <Payment | null>;
}