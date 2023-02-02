import './styles.css';

import StyledInput from 'components/StyledInput';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import google from 'assets/images/google.png';
import facebook from 'assets/images/facebook.png';

import HashLoader from "react-spinners/HashLoader";

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Signup from 'queries/Signup';
import EmailExists from 'queries/EmailExists';



export default function SignupPage () : JSX.Element {

    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", birthDate: new Date(), cpf:"", phoneNumber: "", password: ""});

    const [checkingEmailWarning, setCheckingEmailWarning] = useState("Um e-mail válido é necessário para prosseguir com o cadastro.");
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState("É necessário confirmar a senha");

    const emailExistsQuery = EmailExists(formData.email);
    const signupQuery = Signup(formData);
    const navigate = useNavigate();

    useEffect(()=>{
        const el = document.getElementsByClassName("Response-message")[0];
        if(el)
            el.setAttribute("visible", "false");
    }, []);

    const checkEmail = useCallback(()=>{
        if(emailExistsQuery.data && emailExistsQuery.data.exists){
            (document.getElementById("checkEmail") as HTMLInputElement).setCustomValidity("Invalid field.");
            setCheckingEmailWarning("E-mail já cadastrado.");
        }
        else if(emailExistsQuery.data && !emailExistsQuery.data.exists)
            setStep(2);
    }, [emailExistsQuery.data]);

    useEffect(()=>{
        checkEmail();
    }, [emailExistsQuery.data, checkEmail])

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

    if(step === 1)
        return(
            <div className='SignupPage'>
                <NavBar/>

                <div className='SignupBG'>
                    <div className='InfoSignup'>

                        <h1>Cadastre-se</h1>

                        <StyledInput 
                            title="Email" 
                            warning={checkingEmailWarning}
                            id="checkEmail"
                            name="email"
                            onChange={updateFormData}
                            type="email"
                            required
                        />

                        <div className='Next-button'>
                            <button className='Button' onClick={()=>emailExistsQuery.refetch()} style={{marginTop: "1rem"}}>
                                Próximo
                            </button>
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

                        <p className='Politcs'>
                            Ao se cadastrar, você concorda com nosssa <span>Política de Privacidade</span> e <span>Termos e Condições</span>.
                        </p>

                    </div>
                </div>

                <Footer/>
            </div>
        );



    if(step === 2)
        return (
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

                        <div className='BirthDate'>
                            <label className='BirthDateTitle' htmlFor='birthDate'>Data de nascimento</label>
                            <StyledInput 
                                warning="É necessário preencher com uma data válida." 
                                name="birthDate"
                                onChange={updateFormData}
                                type="date"
                                required
                            />  
                        </div>

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
                            title="Número de celular" 
                            warning="Um número de celular válido compõe DDD+9+número. Totalizando 11 dígitos." 
                            name="phoneNumber"
                            onChange={updateFormData}
                            type="tel"
                            pattern="[1-9]{2}9[6-9]{1}[0-9]{7}"
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
                                className='Button' 
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
        );
    
    return <></>;
}