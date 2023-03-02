import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Product from 'types/product';

interface IDeleteProductResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    product?: Product;
}

export default function DeleteProductQuery (productId: string | undefined) {

    const deleteProductQuery = useQuery('deleteProduct', async () => {

        if(productId){

            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.post('/product/admin/deleteProduct',  {productId: productId}, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as IDeleteProductResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false 
    });

    return deleteProductQuery;

}


