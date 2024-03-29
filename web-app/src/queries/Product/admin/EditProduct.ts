import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Product from 'types/product';

interface IEditProductResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    updatedProduct?: Product;
}

export default function EditProductQuery (product: Product | null) {

    const editProductQuery = useQuery('editProduct', async () => {

        if(product){
            const accessToken = localStorage.getItem("x-access-token");

            const productToBeEdited = {
                ...product,
                price: (product.price === null)?null:Number(product.price),
                comparisonPrice: (product.comparisonPrice === null)?null:Number(product.comparisonPrice),
                costPerProduct: (product.costPerProduct === null)?null:Number(product.costPerProduct),
                sales: Number(product.sales)
            }

            const response = await axios.post('/product/admin/editProduct',  productToBeEdited, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as IEditProductResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return editProductQuery;

}


