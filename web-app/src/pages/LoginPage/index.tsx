import './styles.css';

import { useRef, useState } from 'react';

import Login from 'queries/Login';


export default function LoginPage () : JSX.Element {

    const emailRef = useRef <HTMLInputElement | null>(null);
    const passwordRef = useRef <HTMLInputElement | null>(null);

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
            <input placeholder="email" ref={emailRef} onChange={saveEmail}/>
            <input placeholder="password" ref={passwordRef} onChange={savePassword}/>
            <button className='button' onClick={()=>{loginQuery.refetch()}}>logar</button>
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
                <>{JSON.stringify(loginQuery.data)}</>
                :
                <></>
            }
        </div>
    )

}