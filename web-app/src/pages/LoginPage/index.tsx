import './styles.css';

import StyledInput from 'components/StyledInput';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import HashLoader from "react-spinners/HashLoader";
//import BarLoader from "react-spinners/BarLoader";

import { useState, useEffect } from 'react';
import Login from 'queries/Login';
import { useNavigate } from 'react-router-dom';

export default function LoginPage () : JSX.Element {

    const [formData, setFormData] = useState({email: "", password: ""});
    const loginQuery = Login(formData);
    
    const navigate = useNavigate();

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
                navigate("/");
            }, 1000) //1s
    }, [loginQuery.data, navigate]);

    return(
        <div className='LoginPage'>
            <NavBar/>

            <div className='LoginBG'>
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
                </form>
            </div>

            <Footer/>
        </div>    
    )

}