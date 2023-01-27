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
                warning="e-mail é necessário para realizar login." 
                onChange={saveEmail} 
                type="email"
                pattern=""
                required
            />
            <StyledInput 
                title="senha" 
                warning="e-mail é necessário para realizar login." 
                onChange={savePassword}  
                type="password"
                pattern=""
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