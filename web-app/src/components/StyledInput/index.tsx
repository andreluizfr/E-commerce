import './styles.css';

import eyeOpen from 'assets/svg/eye-open.png'; //trocar pra svg
import eyeClosed from 'assets/svg/eye-closed.png'; //trocar pra svg
import { ReactComponent as Check } from 'assets/svg/check.svg';
//import check2 from 'assets/svg/check2.png'; //trocar pra svg

import { InputHTMLAttributes, useEffect, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    warning?: string | undefined;
    eye?: boolean | undefined;
}

const StyledInput = (props:Props) : JSX.Element => {

    //desestruturação para pegar as props passadas para o component e o resto das props são repassadas para tag input
    const {title, warning, eye, ...rest} = props;

    const ref = useRef <HTMLInputElement | null>(null);

    //inicia a tag input com atributo wasBlured como falso
    useEffect(()=>{
        if(ref.current)
            ref.current.setAttribute("wasBlured", "false");
    }, []);

    //ao perder o foco do input muda o atributo wasBlured para true
    function wasBlured(event: React.FocusEvent<HTMLInputElement>){
        event.target.setAttribute("wasBlured", "true");
    }

    function toggleEye(event: React.MouseEvent<HTMLElement>){
        const styledInput = (event.target as HTMLElement).parentElement;
        const input = styledInput?.firstChild as HTMLInputElement;
        const state = input.getAttribute("type");
        const eye = styledInput?.getElementsByClassName("Eye")[0] as HTMLImageElement;
        
        if(state === "password"){
            input.setAttribute("type", "text");
            eye.src = eyeOpen;
            eye.alt = "olho aberto";
        } else if(state === "text"){
            input.setAttribute("type", "password");
            eye.src = eyeClosed;
            eye.alt = "olho fechado";
        }
    }

    //se foi passada a propriedade warning, coloca a tag p com o warning
    return (
        <div className='Styled-input'>
            <input {...rest} ref={ref} onBlur={wasBlured}/>
            <span>{title}</span>
            {warning?
                <p>{warning}</p>
                :
                null
            }
            {eye?
                <img className='Eye' src={eyeClosed} alt='olho fechado' onClick={toggleEye}/>
                :
                null
            }
            <Check className='Check'/>
 
        </div>
    );

}

export default StyledInput;