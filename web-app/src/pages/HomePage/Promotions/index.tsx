import './styles.css';

import promocaoCarnaval from 'assets/images/banners/promocao_carnaval.png';
import promocaoVerao from 'assets/images/banners/promocao_verao.png';
import promocaoPapelaria from 'assets/images/banners/promocao_papelaria.png';

export default function Promotions () :JSX.Element {
    return(
        <section className='HomePage-promotions'>

            <div className='HomePage-promotions-banners'>
                <img 
                    className='Promotion-image'
                    alt='banner de promoção de carnaval'
                    src={promocaoCarnaval}
                />
                <img 
                    className='Promotion-image'
                    alt='banner de promoção de verão'
                    src={promocaoVerao}
                />
                <img 
                    className='Promotion-image'
                    alt='banner de promoção de produtos de papelaria'
                    src={promocaoPapelaria}
                />
            </div>

        </section>
    );
}