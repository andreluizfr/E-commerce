import './styles.css';

import { HTMLAttributes, useEffect, useRef } from "react";

interface ProgressionBarProps extends HTMLAttributes<HTMLDivElement> {
    number: "5" | "4" | "3" | "2" | "1";
    ratingNumbers: {
        "5": number,
        "4": number,
        "3": number,
        "2": number,
        "1": number
    } | undefined
}

export default function ProgressionBar (props: ProgressionBarProps) : JSX.Element {

    const progressionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        if(progressionBarRef.current && props.number){
            let percentage = 0;
            
            if(props.ratingNumbers)
                percentage = props.ratingNumbers[props.number] / 
                                (
                                    props.ratingNumbers["1"] + 
                                    props.ratingNumbers["2"] + 
                                    props.ratingNumbers["3"] + 
                                    props.ratingNumbers["4"] + 
                                    props.ratingNumbers["5"]
                                ) * 100;

            const bar = progressionBarRef.current.firstChild as HTMLDivElement;
            bar.style.width = String(percentage.toFixed(2)) + "%";
            bar.style.setProperty('--content', String('"' + percentage.toFixed(2)) + '%"');
        }
    }, [props.number, props.ratingNumbers]);

    return(
        <div className='ProgressionBar' ref={progressionBarRef}>
            <div className='Bar'></div>
        </div>
    );
}
