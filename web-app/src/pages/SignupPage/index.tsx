import './styles.css';

import StyledInput from 'components/StyledInput';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import HashLoader from "react-spinners/HashLoader";

import { useState, useEffect } from 'react';
import Signup from 'queries/Signup'; 
import { useNavigate } from 'react-router-dom';

export default function SignupPage () : JSX.Element {

    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", birthDate: new Date(), cpf:"", password: ""});
    const signupQuery = Signup(formData);

    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState("É necessário confirmar a senha");

    const navigate = useNavigate();

    useEffect(()=>{
        const el = document.getElementsByClassName("Response-message")[0];
        el.setAttribute("visible", "false");
    }, []);

    function checkPassword(){
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

        if(confirmPassword === "" && password !== "") setConfirmPasswordWarning("É necessário confirmar a senha");

        else if(confirmPassword !== password){
            (document.getElementById("confirmPassword") as HTMLInputElement).setCustomValidity("Invalid field.");
            setConfirmPasswordWarning("As senhas precisam ser iguais")
        } 

        else {
            (document.getElementById("confirmPassword") as HTMLInputElement).setCustomValidity("");
            setConfirmPasswordWarning("");
        }
    }

    function handleSignup(event: React.FormEvent<HTMLFormElement>){
    
        event.preventDefault();
        if(confirmPasswordWarning === ""){
            signupQuery.refetch();
        
            console.log(formData);

            //makes response visible
            const el = document.getElementsByClassName("Response-message")[0];
            el.setAttribute("visible", "true");
        }

    }

    function updateFormData (event: React.ChangeEvent<HTMLInputElement>) {

        if(event.target.name === "birthDate"){
            setFormData({
                ...formData,
                [event.target.name]:new Date(event.target.value)
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }

    }

    useEffect(()=>{
        if(signupQuery.data && signupQuery.data.success)
            setTimeout(()=>{
                navigate("/cadastro/confirmeSeuEmail");
            }, 1000) //1s
    }, [signupQuery.data, navigate]);

    return(
        <div className='SignupPage'>
            <NavBar/>

            <div className='SignupBG'>
                <form className='InfoSignup' onSubmit={handleSignup}>

                    <h1>Cadastre-se</h1>

                    <div className='NameInputs'>
                        <StyledInput 
                            title="Primeiro nome" 
                            warning="É necessário preencher esse campo." 
                            name="firstName"
                            onChange={updateFormData}
                            type="side-by-side"
                            required
                        />
                        <StyledInput 
                            title="Sobrenome" 
                            warning="É necessário preencher esse campo." 
                            name="lastName"
                            onChange={updateFormData}
                            type="side-by-side"
                            required
                        />
                    </div>

                    <StyledInput 
                        title="Email" 
                        warning="Um e-mail válido é necessário para realizar o cadastro." 
                        name="email"
                        onChange={updateFormData}
                        type="email"
                        required
                    />

                    <label className='BirthDateTitle' htmlFor='birthDate'>Data de nascimento</label>
                    <StyledInput 
                        warning="É necessário preencher com uma data válida." 
                        name="birthDate"
                        onChange={updateFormData}
                        type="date"
                        required
                    />

                    <StyledInput 
                        title="CPF" 
                        warning="Um CPF válido é necessário para realizar o cadastro." 
                        name="cpf"
                        onChange={updateFormData}
                        type="text"
                        pattern="(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{3}\d{3}\d{3}\d{2})"
                        required
                    />
                    <StyledInput 
                        title="Senha" 
                        warning="A senha precisa ter pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caracter especial." 
                        eye={true}
                        id="password"
                        name="password"
                        onChange={(e)=>{updateFormData(e); checkPassword();}}
                        type="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}"
                        required
                    />
                    <StyledInput 
                        title="Confirme sua senha" 
                        warning={confirmPasswordWarning}
                        eye={true}
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={checkPassword}
                        type="password"
                        required
                    />

                    <div className='Signup-button'>
                        <button 
                            className='button' 
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </div>

                    <div className='Response-message'>
                        {signupQuery.isFetching?
                            <HashLoader
                                color="black"
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            : 
                            signupQuery.isError?
                                (signupQuery.error as Error).message
                                : 
                                signupQuery.data?
                                    signupQuery.data.message
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