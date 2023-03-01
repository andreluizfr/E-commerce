import Product from 'types/product';
import './styles.css';

export default function ProductsList (props: {products: Product[]}) : JSX.Element {
    
    return(
        <div className='ProductsList'>
            {
                props.products.map(product=>{
                    return (
                        <div className='Product' key={product.productId}>
                            <span>{product.title}</span>
                            <span>{product.price}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}
