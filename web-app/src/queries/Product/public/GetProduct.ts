import axios from 'libs/axios';
import { useQuery } from 'react-query';
import Product from 'types/product';

interface IGetProductResponse {
    success: boolean;
    message: string;
    product?: Product;
}

export default function GetProduct (productId: string | undefined) {

    const getProductQuery = useQuery('getProduct', async () => {

        if(productId){
            const response = await axios.get('/product/'+productId);

            const data = response.data as IGetProductResponse;
            
            return data;
        }
        else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    return getProductQuery;

}
