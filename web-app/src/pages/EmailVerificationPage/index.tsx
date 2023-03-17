import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import NotFoundPage from 'pages/NotFoundPage';

import emailConfirmado from 'assets/images/email_confirmado.png';

import VerifyEmail from 'queries/User/public/VerifyEmail';

import { useParams, Link } from 'react-router-dom';


export default function EmailVerificationPage () : JSX.Element {

    let { verificationEmailCode } = useParams();

    if(verificationEmailCode){

        const verifyEmailQuery = VerifyEmail({verificationEmailCode});

        return(
            <div className='EmailVerificationPage'>
                <NavBar/>

                <main className='EmailVerificationPage-background'> 


                    {verifyEmailQuery.isFetching?
                        <span>fetching...</span>
                        :
                        verifyEmailQuery.isError?
                            (verifyEmailQuery.error as Error).message
                            :
                            verifyEmailQuery.data?
                                verifyEmailQuery.data.success?
                                    <>
                                        <img 
                                            className='ConfirmedEmail' 
                                            alt='imagem pedindo alertando que e-mail foi confirmado' 
                                            src={emailConfirmado}
                                        />
                                        <button className='GoToHomePageButton'>
                                            <Link to='/'>
                                                Página inicial
                                            </Link>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <span className="NotFoundMessage">{verifyEmailQuery.data.message}</span>
                                        <button className='GoToHomePageButton'>
                                            <Link to='/'>
                                                Página inicial
                                            </Link>
                                        </button>
                                    </>
                                :
                                null
                    }

                </main>

                <Footer/>
            </div>
        );

    } else {
        return (
            <NotFoundPage/>
        );
    }

}
