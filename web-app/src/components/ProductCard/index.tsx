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
            <div>
                <img className="CardImage" alt='imagem do produto' src={product.midias[0].url}/>
                <span className="CardTitle">{product.title}</span>
            </div>
            <div className="Card-infos">
                <span className="CardPrice">R$ {product.price}</span>

                <div className="RatingSales-wrapper">
                    <span className="CardSales">{product.sales} vendidos</span>
                    <span className="CardRating"><RatingStars rate={product.rating} size="small"/></span>
                </div>
            </div>
        </article>
    )

}