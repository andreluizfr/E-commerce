import './styles.css';

import { HTMLAttributes, useEffect, useRef } from "react";

interface RatingProps extends HTMLAttributes<HTMLDivElement> {
    rate?: number;
    size?: "small" | "medium" | "large";
}

export default function RatingStars (props: RatingProps) : JSX.Element {

    const ratingRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        if(props.size){
            ratingRef.current?.setAttribute("size", props.size);
        }
    }, [props.size]);

    useEffect(()=>{
        const stars = ratingRef.current?.getElementsByClassName("Star");

        if(stars && stars.length === 5 && props.rate!==undefined){
            let productRating = props.rate;
        
            for(let i=0; i<5; i+=1){
                productRating-=1;

                if(productRating>0){ //tirou 1 e continuou acima de 0, então é uma estrelinha completa
                    const starBackground = "linear-gradient(90deg, #FFC222 0%, #FFC222 100%)";
                    (stars[i] as HTMLElement).style.background = starBackground;
                }
                else if(productRating>-1){ //valor deu entre -1 e 0, então é uma estrelinha parcial
                    productRating+=1;
                    const breakpoint = (productRating * 100).toFixed(0);
                    const starBackground = "linear-gradient(90deg, #FFC222 0%, #FFC222 "+breakpoint+"%, #D3D3D3 "+breakpoint+"%, #D3D3D3 100%)";
                    (stars[i] as HTMLElement).style.background = starBackground;
                    productRating = -1; //pra forçar a entrar no else nas proximas iterações
                }
                else{
                    const starBackground = "linear-gradient(90deg, #D3D3D3 0%, #D3D3D3 100%)";
                    (stars[i] as HTMLElement).style.background = starBackground;
                }
            }
        }

    }, [props.rate]);

    return(
        <div className='RatingStars' ref={ratingRef}>
            <div className='Star'></div>
            <div className='Star'></div>
            <div className='Star'></div>
            <div className='Star'></div>
            <div className='Star'></div>
        </div>
    );
}
