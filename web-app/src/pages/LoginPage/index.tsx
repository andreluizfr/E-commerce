import './styles.css';

import StyledInput from 'components/StyledInput';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import HashLoader from "react-spinners/HashLoader";
//import BarLoader from "react-spinners/BarLoader";

import Login from 'queries/Login';
import { useState, useEffect } from 'react';

export default function LoginPage () : JSX.Element {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginQuery = Login(email, password);

    function saveEmail(event: React.ChangeEvent<HTMLInputElement>){
        const value = (event.target as HTMLInputElement).value;
        setEmail(value);
    }

    function savePassword(event: React.ChangeEvent<HTMLInputElement>){
        const value = (event.target as HTMLInputElement).value;
        setPassword(value);
    }

    function showResponse(){
        const el = document.getElementsByClassName("Response-message")[0];
        el.setAttribute("visible", "true");
    }

    useEffect(()=>{
        const el = document.getElementsByClassName("Response-message")[0];
        el.setAttribute("visible", "false");
    }, [])

    return(
        <div className='LoginPage'>
            <NavBar/>

            <div className='LoginBG'>
                <div className='InfoLogin'>
                    <h1>Login</h1>
            
                    <StyledInput 
                        title="Email" 
                        warning="E-mail é necessário para realizar login." 
                        onChange={saveEmail} 
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                    />
                    <StyledInput 
                        title="Senha" 
                        warning="A senha deve conter 8 ou mais caracteres e possuir pelo menos 1 número e 1 letra." 
                        eye={true}
                        onChange={savePassword}  
                        type="password"
                        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                        required
                    />
                    <div className='Login-button'>
                        <button 
                            className='button' 
                            onClick={()=>{loginQuery.refetch(); showResponse();}}
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
                    
                </div>
            </div>
            <Footer/>
        </div>    
    )

}