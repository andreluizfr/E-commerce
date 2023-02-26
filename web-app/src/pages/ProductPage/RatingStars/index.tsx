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
    }, []);

    useEffect(()=>{
        const stars = ratingRef.current?.getElementsByClassName("Star");

        if(stars && stars.length === 5 && props.rate!==undefined){
            let productRating = props.rate;
        
            for(let i=0; i<5; i+=1){
                productRating-=1;

                if(productRating>0){
                    const starBackground = "linear-gradient(90deg, #FFC222 0%, #FFC222 100%)";
                    (stars[i] as HTMLElement).style.background = starBackground;
                }
                else if(productRating>-1){
                    productRating+=1;
                    const breakpoint = (productRating * 100).toFixed(0);
                    const starBackground = "linear-gradient(90deg, #FFC222 0%, #FFC222 "+breakpoint+"%, #E3E3E3 "+breakpoint+"%, #E3E3E3 100%)";
                    (stars[i] as HTMLElement).style.background = starBackground;
                    productRating = -1;
                }
                else{
                    const starBackground = "linear-gradient(90deg, #E3E3E3 0%, #E3E3E3 100%)";
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
