import './styles.css';
import Product from 'types/product';
import { HTMLAttributes } from 'react';

interface Prop extends  HTMLAttributes<HTMLDivElement>{
    product: Product;   
};

export default function ProductCard(props:Prop) : JSX.Element{

    const {product, ...rest} = props;

    return (
        <article className='ProductCard' {...rest}>
            <span className="ProductId">{product.productId}</span>
            <span className="Title">{product.title}</span>
            <img className="Image" alt='imagem do produto' src={product.midias[0].url}/>
        </article>
    )

}