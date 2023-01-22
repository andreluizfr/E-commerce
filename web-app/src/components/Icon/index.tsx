import './styles.css';

import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {

}

const Icon = (props:Props) : JSX.Element => {

    return (
        <div className={props.className}>
            {props.children}
        </div>
    );

}

export default Icon;