import './styles.css';

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    warning: string;
}

const StyledInput = (props:Props) : JSX.Element => {

    const {title, warning, ...rest} = props;

    return (
        <div className='Styled-input'>
            <input {...rest}></input>
            <span>{title}</span>
            <p>{warning}</p>
        </div>
    );

}

export default StyledInput;