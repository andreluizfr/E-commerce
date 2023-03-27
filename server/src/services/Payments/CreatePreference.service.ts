import { IPaymentsRepository } from "../../repositories/Payments/IPayments.repository";
import { Product } from "../../entities/Product.entity";
import MercadoPago from '../../helpers/mercadoPago';

//contains the business logic
export class CreatePreferenceService{
    constructor (){}

    async execute(
        cart: {
            quantity: number,
            product: Product
        }[],
        userId: string
    ){

        const items = Array.from(cart).map(productStatus=> {
            return ({
                title: "Pagamento de produtos", 
                unit_price: Number(productStatus.product.price),
                quantity: Number(productStatus.quantity)
            })
        });

        const preferences = {
            items: items,
            back_urls: {
                "success": process.env.BASE_URL_SERVER? (process.env.BASE_URL_SERVER+"/payment/feedback") : "http://localhost:5000/feedback",
                "failure": process.env.BASE_URL_SERVER? (process.env.BASE_URL_SERVER+"/payment/feedback") : "http://localhost:5000/feedback",
                "pending": process.env.BASE_URL_SERVER? (process.env.BASE_URL_SERVER+"/payment/feedback") : "http://localhost:5000/feedback"
            },
            aditional_info: {
                userId: userId
            },
            auto_return: "approved" as ("approved" | "all" | undefined)
        }

        const response = await MercadoPago.preferences.create(preferences);

        return {preferenceId: response.body.id}

    }
    
}