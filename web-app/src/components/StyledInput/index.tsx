import './styles.css';

import { InputHTMLAttributes, useEffect, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    warning?: string | undefined;
    ref?: React.MutableRefObject<HTMLInputElement | null> | undefined;
}

const StyledInput = (props:Props) : JSX.Element => {

    //desestruturação para pegar as props passadas para o component e o resto das props são repassadas para tag input
    const {title, warning, ...rest} = props;
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
        </div>
    );

}

export default StyledInput;