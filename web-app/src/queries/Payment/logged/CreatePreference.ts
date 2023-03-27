import { useQuery } from 'react-query';
import axios from 'libs/axios';
import { ProductState } from 'store/features/cartSlice';

interface ICreatePreferenceResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    preferenceId?: string;
}

export default function CreatePreferenceQuery (cart: ProductState[], userId: string | undefined) {

    const createPreferenceQuery = useQuery('createPreference', async () => {

        if(userId && cart.length>0){
            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.post('/payment/createPreference',  {cart: cart, userId: userId}, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as ICreatePreferenceResponse;

            return data;
        }
        else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    return createPreferenceQuery;

}


