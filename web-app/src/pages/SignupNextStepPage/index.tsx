import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import confirmeSeuEmail from 'assets/images/confirme_seu_email.png';

import { Link } from 'react-router-dom';

export default function SignupNextStepPage () : JSX.Element {

    return(
        <div className='SignupNextStepPage'>
            <NavBar/>

            <main className='SignupNextStepPage-background'> 

                    <img 
                        className='ConfirmYourEmail' 
                        alt='imagem pedindo confirmação do e-mail' 
                        src={confirmeSeuEmail}
                    />

                    <button className='GoToHomePageButton'>
                        <Link to='/'>
                            Página inicial
                        </Link>
                    </button>
                    
            </main>

            <Footer/>
        </div>
    );
}
