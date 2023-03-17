import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import notFound from 'assets/images/not_found.png';


export default function NotFoundPage () : JSX.Element {


    return(
        <div className='NotFoundPage'>
            <NavBar/>

                <main className='NotFoundPage-background'>
                    <img 
                        className='NotFoundImg' 
                        alt='imagem com menino e interrogações flutuante indicando que página não foi encontrada' 
                        src={notFound}
                    />
                </main>

            <Footer/>
        </div>
    );
}
