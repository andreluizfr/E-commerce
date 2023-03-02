import './styles.css';
import RatingStars from 'components/RatingStars';
import * as Dialog from '@radix-ui/react-dialog';

import Product from 'types/product';
import DeleteAlertDialog from './DeleteAlertDialog';


export default function ProductsList (props: {products: Product[]}) : JSX.Element {
    
    return(
        <div className='ProductsList'>
            <table className="Table">
                <tr className="TableRow">
                    <th className="TableHeader">Id</th>
                    <th className="TableHeader">Título</th>
                    <th className="TableHeader">Preço</th>
                    <th className="TableHeader">Categoria</th>
                    <th className="TableHeader">Avaliação</th>
                    <th className="TableHeader">URL do provedor</th>
                </tr>
                {
                    props.products.map(product=>{
                        return (
                            <tr className="TableRow TableRowLink" key={product.productId}>
                                <td className="TableData">{product.productId}</td>
                                <td className="TableData">{product.title}</td>
                                <td className="TableData">{product.price}</td>
                                <td className="TableData">{product.category}</td>
                                <td className="TableData"><RatingStars rate={product.rating} size="small"/></td>
                                <td className="TableData">{product.providerURL}</td>
                                <td><DeleteAlertDialog productId={product.productId}/></td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}
