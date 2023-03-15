import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface IDeleteProductResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
}

export default function DeleteProductQuery (productId: string | undefined) {

    const deleteProductQuery = useQuery('deleteProduct', async () => {

        if(productId){

            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.put('/product/admin/deleteProduct',  {productId: productId}, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as IDeleteProductResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false 
    });

    return deleteProductQuery;

}


