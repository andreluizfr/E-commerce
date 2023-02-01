import StyledInput from 'components/StyledInput';
import './styles.css';

export default function SignupPage () : JSX.Element {

    return(
        <div className='SignupPage'>
            <h1>signup</h1>
            <StyledInput 
                title="Email" 
                warning="Um e-mail válido é necessário para realizar login" 
                name="email"
                type="email"
                required
            />
            <input placeholder='firstName'/>
            <input placeholder='lastName'/>
            <input placeholder='cpf'/>
            <input type='date'/>
            <StyledInput 
                title="Senha" 
                warning="É necessário digitar sua senha" 
                eye={true}
                name="password"
                type="password"
                required
            />
            <StyledInput 
                title="Senha" 
                warning="É necessário digitar sua senha" 
                eye={true}
                name="password"
                type="password"
                required
            />
            
        </div>
    )

}