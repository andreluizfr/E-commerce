import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Product from 'types/product';

interface IAddProductResponse {
    refresh: boolean;
    success: boolean;
    message: string;
    product?: Product;
}

export default function AddProductQuery (product: Product) {

    const addProductQuery = useQuery('addProduct', async () => {

        const accessToken = localStorage.getItem("x-access-token");

        const response = await axios.post('/product/admin/addProduct',  product, {headers: { Authorization: `Bearer ${accessToken}` }});
    
        const data = response.data as IAddProductResponse;

        return data;

    }, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    return addProductQuery;

}


