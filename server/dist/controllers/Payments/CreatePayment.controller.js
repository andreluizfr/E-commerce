"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreatePayment_service_1 = require("../../services/Payments/CreatePayment.service");
const Payments_repository_1 = require("../../repositories/Payments/Payments.repository");
const Orders_repository_1 = require("../../repositories/Orders/Orders.repository");
const paymentsRepository = new Payments_repository_1.PaymentsRepository();
const ordersRepository = new Orders_repository_1.OrdersRepository();
const createPaymentService = new CreatePayment_service_1.CreatePaymentService(paymentsRepository, ordersRepository);
exports.default = new class CreatePaymentController {
    constructor() { }
    async handle(req, res) {
        const { paymentForm, cart, userId } = req.body;
        try {
            const { order } = await createPaymentService.execute(paymentForm, cart, userId);
            return res.status(201).send({
                refresh: false,
                success: true,
                message: "Pedido criado com sucesso.",
                order: order
            });
        }
        catch (err) {
            const error = err;
            return res.status(202).send({
                refresh: false,
                success: false,
                message: error.message || "Falha ao criar pedido.",
                order: null
            });
        }
    }
};
