import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Product from 'types/product';

interface IGetProductsResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    products: Product[];
}

export default function GetProducts (query: string) {

    const getProductsQuery = useQuery('getProducts', async () => {

        const response = await axios.get('/product'+query);
    
        const data = response.data as IGetProductsResponse;

        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    return getProductsQuery;

}


