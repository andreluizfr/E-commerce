import './styles.css';

import RatingStars from 'components/RatingStars';
import DeleteProductDialog from './DeleteProductDialog';
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
                                <tr className="TableRow TableRowLink" key={product.id}>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.id}</td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.title}</td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.price}</td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.category}</td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>
                                        <RatingStars rate={product.rating} size="small"/>
                                    </td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.providerURL}</td>
                                    <td className="TableData" onClick={()=>editProduct(product)}>{product.productStatus}</td>
                                    <td>
                                        <DeleteProductDialog 
                                            productId={product.id} 
                                            setRefreshProducts={setRefreshProducts}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <EditProduct productToBeEdited={productToBeEdited} setProductToBeEdited={setProductToBeEdited}/>
        </div>
    );
}
