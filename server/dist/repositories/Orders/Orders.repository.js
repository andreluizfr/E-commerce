"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const Order_entity_1 = require("../../entities/Order.entity");
const data_source_1 = require("../../database/data-source");
class OrdersRepository {
    async createOrder(order) {
        const ordersRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        const createdOrder = await ordersRepository.save(order);
        return createdOrder;
    }
    async updateOrderStatus(orderId, status) {
        const ordersRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        const order = await ordersRepository.findOneBy({ id: orderId });
        if (order) {
            order.status = status;
            const updatedOrder = await ordersRepository.save(order);
            return updatedOrder;
        }
        else
            return null;
    }
    async findById(orderId) {
        const ordersRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        const order = await ordersRepository.findOneBy({ id: orderId });
        return order;
    }
    async getByUser(userId) {
        const ordersRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        const orders = await ordersRepository.find({
            where: {
                user: userId
            },
            relations: {
                payment: true
            }
        });
        return orders;
    }
}
exports.OrdersRepository = OrdersRepository;
