import './styles.css';

export default function SignupPage () : JSX.Element {

    return(
        <div className='SignupPage'>
            <h1>signup</h1>
            <input placeholder='email'/>
            <input placeholder='firstName'/>
            <input placeholder='lastName'/>
            <input placeholder='cpf'/>
            <input type='date'/>
            <input placeholder='password'/>
            <input placeholder='password'/>
        </div>
    )

}