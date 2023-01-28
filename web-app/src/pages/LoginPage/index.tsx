import './styles.css';

import { useRef, useState } from 'react';

import Login from 'queries/Login';

import StyledInput from 'components/StyledInput';


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

    return(
        <div className='LoginPage'>

            <h1>login</h1>

            <StyledInput 
                title="email" 
                warning="E-mail é necessário para realizar login." 
                onChange={saveEmail} 
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
            />
            <StyledInput 
                title="senha" 
                warning="A senha deve conter 8 ou mais caracteres e possuir pelo menos 1 número e 1 letra." 
                onChange={savePassword}  
                type="password"
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                required
            />
            <button 
                className='button' 
                onClick={()=>{loginQuery.refetch()}}
            >
                logar
            </button>

            {loginQuery.isFetching?
                <>fetching</>
                : 
                <></>
            }
            {loginQuery.isError?
                <>{JSON.stringify(loginQuery.error)}</>
                : 
                <></>
            }
            {loginQuery.data?
                <>
                    <div>{JSON.stringify(loginQuery.data)}</div>
                    <a href="http://localhost:3000/">Voltar para página inicial</a>
                </>
                :
                <></>
            }
        </div>
    )

}