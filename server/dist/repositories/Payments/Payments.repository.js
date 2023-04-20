"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRepository = void 0;
const Payment_entity_1 = require("../../entities/Payment.entity");
const data_source_1 = require("../../database/data-source");
class PaymentsRepository {
    async createPayment(payment) {
        const paymentsRepository = data_source_1.AppDataSource.getRepository(Payment_entity_1.Payment);
        const createdPayment = await paymentsRepository.save(payment);
        return createdPayment;
    }
    async updatePaymentStatus(paymentId, status) {
        const paymentsRepository = data_source_1.AppDataSource.getRepository(Payment_entity_1.Payment);
        const payment = await paymentsRepository.findOneBy({ id: paymentId });
        if (payment) {
            payment.status = status;
            const updatedPayment = await paymentsRepository.save(payment);
            return updatedPayment;
        }
        else
            return null;
    }
    async findById(paymentId) {
        const paymentsRepository = data_source_1.AppDataSource.getRepository(Payment_entity_1.Payment);
        const payment = await paymentsRepository.findOneBy({ id: paymentId });
        return payment;
    }
}
exports.PaymentsRepository = PaymentsRepository;
