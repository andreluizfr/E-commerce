import { useQuery } from 'react-query';
import axios from 'libs/axios';
import { ProductState } from 'store/features/cartSlice';

interface ICreatePaymentResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    order?: object | null;
}

export default function CreatePreferenceQuery (paymentForm: object | null, cart: ProductState[], userId: string | undefined) {

    const createPreferenceQuery = useQuery('createPreference', async () => {

        if(paymentForm && userId && cart.length>0){
            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.post('/payment/createPayment',  {paymentForm: paymentForm, cart: cart, userId: userId}, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as ICreatePaymentResponse;

            return data;
        }
        else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return createPreferenceQuery;

}


