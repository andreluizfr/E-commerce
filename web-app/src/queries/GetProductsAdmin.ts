import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Product from 'types/product';

interface IGetProductsResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    products?: Product[];
}

export default function GetProductsAdmin (query: string) {

    const getProductsAdminQuery = useQuery('getProductsAdmin', async () => {

        const accessToken = localStorage.getItem("x-access-token");

        const response = await axios.get('/product/admin'+query,  {headers: { Authorization: `Bearer ${accessToken}` }});
    
        const data = response.data as IGetProductsResponse;

        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return getProductsAdminQuery;

}


