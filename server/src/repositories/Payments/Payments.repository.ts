import { Payment } from "../../entities/Payment.entity";
import { IPaymentsRepository } from "./IPayments.repository";
import { AppDataSource } from "../../database/data-source";


export class PaymentsRepository implements IPaymentsRepository{

    async createPayment(payment: Payment){
        const paymentsRepository = AppDataSource.getRepository(Payment);
        const createdPayment = await paymentsRepository.save(payment);

        return createdPayment;
    }

    async updatePaymentStatus(paymentId: string, status: string){
        const paymentsRepository = AppDataSource.getRepository(Payment);
        const payment = await paymentsRepository.findOneBy({id: paymentId});

        if(payment){
            payment.status = status;

            const updatedPayment = await paymentsRepository.save(payment);
            return updatedPayment;
        } else return null;
    }

    async findById(paymentId: string){
        const paymentsRepository = AppDataSource.getRepository(Payment)
        const payment = await paymentsRepository.findOneBy({id: paymentId});
        
        return payment;
    }

    async getByUser(userId: string){
        const paymentsRepository = AppDataSource.getRepository(Payment)
        const payments = await paymentsRepository.find({
            where: {
                user: userId
            }
        });
        
        return payments;
    }

}