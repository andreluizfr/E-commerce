import './styles.css';

import NavBar from 'components/NavBar';
import Carousel from './Carousel';
import Categories from './Categories';
import Promotions from './Promotions';
import Catalogs from './Catalogs';
import SocialMedia from './SocialMedia';
import Footer from 'components/Footer';

export default function HomePage () : JSX.Element {

    return(
        <div className='HomePage'>
            <NavBar/>

            <main className='HomePage-container'>
                <Carousel/>

                <Categories/>

                <Promotions/>

                <Catalogs/>

                <SocialMedia/>
            </main>

            <Footer/>
        </div>
    )

}