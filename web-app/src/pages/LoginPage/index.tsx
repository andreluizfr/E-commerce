import './styles.css';

import StyledInput from 'components/StyledInput';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import google from 'assets/images/google.png';
import facebook from 'assets/images/facebook.png';

import HashLoader from "react-spinners/HashLoader";
//import BarLoader from "react-spinners/BarLoader";

import { useState, useEffect } from 'react';
import Login from 'queries/User/public/Login';

export default function LoginPage () : JSX.Element {

    const [formData, setFormData] = useState({email: "", password: ""});
    const loginQuery = Login(formData);
    
    useEffect(()=>{
        const el = document.getElementsByClassName("Response-message")[0];
        el.setAttribute("visible", "false");
    }, []);

    function handleLogin(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        loginQuery.refetch();

        //makes response visible
        const el = document.getElementsByClassName("Response-message")[0];
        el.setAttribute("visible", "true");
    }

    function updateFormData (event: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(()=>{
        if(loginQuery.data && loginQuery.data.success)
            setTimeout(()=>{
                window.location.href = process.env.REACT_APP_APP_BASE_URL || "http://localhost:3000";  //´com href porque precisa atualizar a página pra dar fetch no user
            }, 1000) //1s
        
    }, [loginQuery.data]);

    return(
        <div className='LoginPage'>
            <NavBar/>

            <main className='LoginBG'>
                <form className='InfoLogin' onSubmit={handleLogin} noValidate> 
                    <h1>Login</h1>
            
                    <StyledInput 
                        title="Email" 
                        name="email"
                        onChange={updateFormData}
                        type="text"
                        required
                    />
                    <StyledInput 
                        title="Senha" 
                        eye={true}
                        name="password"
                        onChange={updateFormData}
                        type="password"
                        required
                    />

                    <div className='Login-button'>
                        <button 
                            className='button' 
                            type="submit"
                        >
                            Logar
                        </button>
                    </div>

                    <div className='Response-message'>
                        {loginQuery.isFetching?
                            <HashLoader
                                color="black"
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            : 
                            loginQuery.isError?
                                (loginQuery.error as Error).message
                                : 
                                loginQuery.data?
                                    loginQuery.data.message
                                    :
                                    <></>
                            
                        }
                    </div>

                    <div className='Or'>
                        <span className='Line'></span>
                        <span className='OrWord'>Ou</span>
                        <span className='Line'></span>
                    </div>

                    <div className='Login-with-google-facebook'>
                        <img src={google} alt='icone do google'/>
                        <span>Entre com o Google</span>
                    </div>

                    <div className='Login-with-google-facebook'>
                        <img src={facebook} alt='icone do facebook'/>
                        <span>Entre com o Facebook</span>
                    </div>

                </form>
            </main>

            <Footer/>
        </div>    
    )

}