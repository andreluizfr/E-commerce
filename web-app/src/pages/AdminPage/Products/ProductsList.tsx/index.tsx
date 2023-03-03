import './styles.css';

import RatingStars from 'components/RatingStars';
import DeleteAlertDialog from './DeleteAlertDialog';
import EditProduct from './EditProduct';

import { useState } from 'react';

import Product from 'types/product';



interface Props {
    products: Product[];
    setRefreshProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductsList ({products, setRefreshProducts}: Props) : JSX.Element {
    
    const [productToBeEdited, setProductToBeEdited] = useState <Product | null>(null);

    function editProduct (product: Product){
        setProductToBeEdited(product);
    }

    return(
        <div className='ProductsList'>
            <table className="Table">
                <thead>
                    <tr className="TableRow">
                        <th className="TableHeader">Id</th>
                        <th className="TableHeader">Título</th>
                        <th className="TableHeader">Preço</th>
                        <th className="TableHeader">Categoria</th>
                        <th className="TableHeader">Avaliação</th>
                        <th className="TableHeader">URL do provedor</th>
                        <th className="TableHeader">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>{
                            return (
                                <tr 
                                    className="TableRow TableRowLink" 
                                    key={product.productId} 
                                    onClick={()=>editProduct(product)}
                                >
                                    <td className="TableData">{product.productId}</td>
                                    <td className="TableData">{product.title}</td>
                                    <td className="TableData">{product.price}</td>
                                    <td className="TableData">{product.category}</td>
                                    <td className="TableData"><RatingStars rate={product.rating} size="small"/></td>
                                    <td className="TableData">{product.providerURL}</td>
                                    <td className="TableData">{product.productStatus}</td>
                                    <td>
                                        <DeleteAlertDialog 
                                            productId={product.productId} 
                                            setRefreshProducts={setRefreshProducts}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <EditProduct product={productToBeEdited} setProductToBeEdited={setProductToBeEdited}/>
        </div>
    );
}
