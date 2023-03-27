import { Order } from "../../entities/Order.entity";
import { IOrdersRepository } from "./IOrders.repository";
import { AppDataSource } from "../../database/data-source";


export class OrdersRepository implements IOrdersRepository{

    async createOrder(order: Order){
        const ordersRepository = AppDataSource.getRepository(Order);
        const createdOrder = await ordersRepository.save(order);

        return createdOrder;
    }

    async updateOrderStatus(orderId: string, status: string){
        const ordersRepository = AppDataSource.getRepository(Order);
        const order = await ordersRepository.findOneBy({id: orderId});

        if(order){
            order.status = status;

            const updatedOrder = await ordersRepository.save(order);
            return updatedOrder;
        } else return null;
    }

    async findById(orderId: string){
        const ordersRepository = AppDataSource.getRepository(Order)
        const order = await ordersRepository.findOneBy({id: orderId});
        
        return order;
    }

    async getByUser(userId: string){
        const ordersRepository = AppDataSource.getRepository(Order)
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