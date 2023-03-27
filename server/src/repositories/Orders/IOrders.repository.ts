import {Order} from '../../entities/Order.entity';

export interface IOrdersRepository{
    createOrder(order: Order) : Promise <Order>;
    updateOrderStatus(orderId: string, status: string) : Promise <Order | null>;
    findById(orderId: string) : Promise <Order | null>;
    getByUser(userId: string) : Promise <Order[] | null>;
}