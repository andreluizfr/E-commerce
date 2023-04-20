"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentService = void 0;
const Payment_entity_1 = require("../../entities/Payment.entity");
const Order_entity_1 = require("../../entities/Order.entity");
const mercadoPago_1 = __importDefault(require("../../helpers/mercadoPago"));
class CreatePaymentService {
    paymentsRepository;
    ordersRepository;
    constructor(paymentsRepository, ordersRepository) {
        this.paymentsRepository = paymentsRepository;
        this.ordersRepository = ordersRepository;
    }
    async execute(paymentForm, cart, userId) {
        paymentForm.transaction_amount = Number(paymentForm.transaction_amount.toFixed(2));
        console.log(paymentForm);
        switch (paymentForm.payment_method_id) {
            case 'pix': {
                const dateOfExpiration = new Date();
                dateOfExpiration.setDate(dateOfExpiration.getDate() + 1);
                const response = await mercadoPago_1.default.payment.save({ ...paymentForm, date_of_expiration: String(dateOfExpiration) });
                const { payment_method_id, payment_type_id, status, status_detail, id, transaction_details, point_of_interaction } = response.body;
                const payment = new Payment_entity_1.Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail: status_detail
                }, transaction_details, point_of_interaction.transaction_data);
                const createdPayment = await this.paymentsRepository.createPayment(payment);
                const items = cart.map(productStatus => {
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                });
                const order = new Order_entity_1.Order({ user: userId, payment: createdPayment, items: items });
                const createdOrder = await this.ordersRepository.createOrder(order);
                return { order: createdOrder };
            }
            case 'bolbradesco': {
                const dateOfExpiration = new Date();
                dateOfExpiration.setDate(dateOfExpiration.getDate() + 3);
                const response = await mercadoPago_1.default.payment.save(paymentForm);
                const { payment_method_id, payment_type_id, status, status_detail, id, transaction_details } = response.body;
                const payment = new Payment_entity_1.Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail: status_detail
                }, transaction_details);
                const createdPayment = await this.paymentsRepository.createPayment(payment);
                const items = cart.map(productStatus => {
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                });
                const order = new Order_entity_1.Order({ user: userId, payment: createdPayment, items: items });
                const createdOrder = await this.ordersRepository.createOrder(order);
                return { order: createdOrder };
            }
            default: {
                const response = await mercadoPago_1.default.payment.save(paymentForm);
                const { payment_method_id, payment_type_id, status, status_detail, id } = response.body;
                const payment = new Payment_entity_1.Payment({
                    id: id,
                    type: payment_type_id,
                    method: payment_method_id,
                    status: status,
                    statusDetail: status_detail
                });
                const createdPayment = await this.paymentsRepository.createPayment(payment);
                const items = cart.map(productStatus => {
                    return ({
                        id: productStatus.product.id,
                        title: productStatus.product.title,
                        price: Number(productStatus.product.price),
                        quantity: productStatus.quantity
                    });
                });
                const order = new Order_entity_1.Order({ user: userId, payment: createdPayment, items: items });
                const createdOrder = await this.ordersRepository.createOrder(order);
                return { order: createdOrder };
            }
        }
    }
}
exports.CreatePaymentService = CreatePaymentService;
