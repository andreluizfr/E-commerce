import './styles.css';

import { useEffect, useRef, useState } from 'react';
//import { Link } from 'react-router-dom';

export default function Carousel () : JSX.Element {

    const firstSnapper = useRef <HTMLDivElement>(null);
    const secondSnapper = useRef <HTMLDivElement>(null);
    const thirdSnapper = useRef <HTMLDivElement>(null);
    const fourthSnapper = useRef <HTMLDivElement>(null);

    const [start, setStart] = useState(false);
    const [interval, SetInterval] = useState <NodeJS.Timer | string>("");
    const [actualSlide, setActualSlide] = useState(1);

    function slideTo(n: number, event?: React.MouseEvent <HTMLAnchorElement>){
        event?.preventDefault();

        if(firstSnapper.current && secondSnapper.current && thirdSnapper.current && fourthSnapper.current){
            firstSnapper.current.style.left = (n-1)*100+"%";
            secondSnapper.current.style.left = (n-1)*100+"%";
            thirdSnapper.current.style.left = (n-1)*100+"%";
            fourthSnapper.current.style.left = (n-1)*100+"%";
        }

        setActualSlide(n);
    }

    //delay inicial pra que não sejam setados dois intervalos de uma vez deixando o site bugado
    useEffect(()=>{
        setTimeout(()=>setStart(true), 1000);
    }, []);

    useEffect(()=>{
        if(start){
            clearInterval(interval);
            console.log(actualSlide);
            if(actualSlide){
                if(actualSlide === 4)
                    SetInterval(setInterval(()=>slideTo(1), 4000));
                else
                    SetInterval(setInterval(()=>slideTo(actualSlide+1), 4000));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualSlide, start]);


    return(

        <section className='HomePage-carousel'>

            <ol className="carousel__viewport">
                <li id="carousel__slide1" className="carousel__slide">
                    <div className="carousel__snapper" ref={firstSnapper}>
                        <a href="#carousel__slide4" className="carousel__prev" onClick={(e)=>slideTo(4, e)}>Go to last slide</a>
                        <a href="#carousel__slide2" className="carousel__next" onClick={(e)=>slideTo(2, e)}>Go to next slide</a>
                    </div>
                </li>
                <li id="carousel__slide2" className="carousel__slide">
                    <div className="carousel__snapper" ref={secondSnapper}>
                        <a href="#carousel__slide1" className="carousel__prev" onClick={(e)=>slideTo(1, e)}>Go to previous slide</a>
                        <a href="#carousel__slide3" className="carousel__next" onClick={(e)=>slideTo(3, e)}>Go to next slide</a>
                    </div>
                </li>
                <li id="carousel__slide3" className="carousel__slide">
                    <div className="carousel__snapper" ref={thirdSnapper}>
                        <a href="#carousel__slide2" className="carousel__prev" onClick={(e)=>slideTo(2, e)}>Go to previous slide</a>
                        <a href="#carousel__slide4" className="carousel__next" onClick={(e)=>slideTo(4, e)}>Go to next slide</a>
                    </div>
                </li>
                <li id="carousel__slide4" className="carousel__slide">
                    <div className="carousel__snapper" ref={fourthSnapper}>
                        <a href="#carousel__slide3" className="carousel__prev" onClick={(e)=>slideTo(3, e)}>Go to previous slide</a>
                        <a href="#carousel__slide1" className="carousel__next" onClick={(e)=>()=>slideTo(1, e)}>Go to first slide</a>
                    </div>
                </li>
            </ol>
            <ol className="carousel__navigation-list">
                <li className="carousel__navigation-item">
                    <a href="#carousel__slide1"  className="carousel__navigation-button" onClick={(e)=>slideTo(1, e)}>Go to slide 1</a>
                </li>
                <li className="carousel__navigation-item">
                    <a href="#carousel__slide2" className="carousel__navigation-button" onClick={(e)=>slideTo(2, e)}>Go to slide 2</a>
                </li>
                <li className="carousel__navigation-item">
                    <a href="#carousel__slide3" className="carousel__navigation-button" onClick={(e)=>slideTo(3, e)}>Go to slide 3</a>
                </li>
                <li className="carousel__navigation-item">
                    <a href="#carousel__slide4" className="carousel__navigation-button" onClick={(e)=>slideTo(4, e)}>Go to slide 4</a>
                </li>
            </ol>
        </section>

    )

}