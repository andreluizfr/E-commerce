import './styles.css';
import Product from 'types/product';
import { HTMLAttributes } from 'react';
import RatingStars from 'components/RatingStars';

interface Prop extends  HTMLAttributes<HTMLDivElement>{
    product: Product;   
};

export default function ProductCard(props:Prop) : JSX.Element{

    const {product, ...rest} = props;

    return (
        <article className='ProductCard' {...rest}>
            <img className="Image" alt='imagem do produto' src={product.midias[0].url}/>
            <span className="Title">{product.title}</span>
            <span className="Price">R$ {product.price}</span>
            <span className="Rating"><RatingStars rate={product.rating} size="small"/></span>
        </article>
    )

}