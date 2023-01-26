import './styles.css';

import { Link } from 'react-router-dom';

import NavBar from 'components/NavBar';
import CategoriesContainer from './CategoriesContainer';

import promocaoCarnaval from 'assets/images/banners/promocao_carnaval.png';
import promocaoVerao from 'assets/images/banners/promocao_verao.png';
import promocaoPapelaria from 'assets/images/banners/promocao_papelaria.png';


export default function HomePage () : JSX.Element {

    return(
        <>
            <NavBar/>
            <main className='HomePage'>

                <Link to='/login'>login page</Link>
                <br></br>
                <Link to='/cadastro'>signup page</Link>

                <section className='HomePage-carousel'>

                </section>

                <CategoriesContainer/>

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

                {
                    <section className='Catalogs'>
                    </section>
                }

                <section className='HomePage-socialMedia'>

                </section>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
                <div>abobrinha</div>
            </main>
        </>
    )

}