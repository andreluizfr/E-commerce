import './styles.css';

import { useEffect, useRef, useState } from 'react';
//import { Link } from 'react-router-dom';

export default function Carousel () : JSX.Element {

    const firstSnapper = useRef <HTMLDivElement>(null);
    const secondSnapper = useRef <HTMLDivElement>(null);
    const thirdSnapper = useRef <HTMLDivElement>(null);
    const fourthSnapper = useRef <HTMLDivElement>(null);

    const firstButton = useRef <HTMLAnchorElement>(null);
    const secondButton = useRef <HTMLAnchorElement>(null);
    const thirdButton = useRef <HTMLAnchorElement>(null);
    const fourthButton = useRef <HTMLAnchorElement>(null);

    const [timeout, SetTimeout] = useState <NodeJS.Timeout>();
    const [actualSlide, setActualSlide] = useState(0);

    useEffect(()=>{

        firstButton.current?.setAttribute("active", "true");
        secondButton.current?.setAttribute("active", "false");
        thirdButton.current?.setAttribute("active", "false");
        fourthButton.current?.setAttribute("active", "false");

        setActualSlide(1);

    }, []);

    useEffect(()=>{

        if(actualSlide){
            console.log("slide:",actualSlide);
            //mostrando a imagem relativa ao slide atual
            if(firstSnapper.current && secondSnapper.current && thirdSnapper.current && fourthSnapper.current){
                firstSnapper.current.style.left = (actualSlide-1)*100+"%";
                secondSnapper.current.style.left = (actualSlide-1)*100+"%";
                thirdSnapper.current.style.left = (actualSlide-1)*100+"%";
                fourthSnapper.current.style.left = (actualSlide-1)*100+"%";
            }
            //setando a mudança pra o proximo slide pra 4s
            if(actualSlide === 1)
                SetTimeout(setTimeout(()=>{
                    setActualSlide(2); 
                    firstButton.current?.setAttribute("active", "false");
                    secondButton.current?.setAttribute("active", "true");
                }, 4000));
            else if(actualSlide === 2)
                SetTimeout(setTimeout(()=>{
                    setActualSlide(3); 
                    secondButton.current?.setAttribute("active", "false");
                    thirdButton.current?.setAttribute("active", "true");
                }, 4000));
            else if(actualSlide === 3)
                SetTimeout(setTimeout(()=>{
                    setActualSlide(4); 
                    thirdButton.current?.setAttribute("active", "false");
                    fourthButton.current?.setAttribute("active", "true");
                }, 4000));
            else if(actualSlide === 4)
                SetTimeout(setTimeout(()=>{
                    setActualSlide(1); 
                    fourthButton.current?.setAttribute("active", "false");
                    firstButton.current?.setAttribute("active", "true");
                }, 4000));
        }
        
    }, [actualSlide]);

    //quando usuário clica manualmente em um slide
    function setSlideTo(n: number, event: React.MouseEvent <HTMLAnchorElement>){

        event.preventDefault();
        clearTimeout(timeout); //impedir a passagem pra o proximo slide que iria ocorrer

        firstButton.current?.setAttribute("active", "false");
        secondButton.current?.setAttribute("active", "false");
        thirdButton.current?.setAttribute("active", "false");
        fourthButton.current?.setAttribute("active", "false");

        if(n === 1){
            setActualSlide(1);
            firstButton.current?.setAttribute("active", "true");
        }
        else if(n === 2){
            setActualSlide(2);
            secondButton.current?.setAttribute("active", "true");
        }
        else if (n === 3){
            setActualSlide(3);
            thirdButton.current?.setAttribute("active", "true");
        }
        else if (n === 4){
            setActualSlide(4);
            fourthButton.current?.setAttribute("active", "true");
        }

    }

    return(

        <section className='HomePage-carousel'>

            <ol className="carousel__viewport">
                <li id="carousel__slide1" className="carousel__slide">
                    <div className="carousel__snapper" ref={firstSnapper}>
                    </div>
                </li>
                <li id="carousel__slide2" className="carousel__slide">
                    <div className="carousel__snapper" ref={secondSnapper}>
                    </div>
                </li>
                <li id="carousel__slide3" className="carousel__slide">
                    <div className="carousel__snapper" ref={thirdSnapper}>
                    </div>
                </li>
                <li id="carousel__slide4" className="carousel__slide">
                    <div className="carousel__snapper" ref={fourthSnapper}>
                    </div>
                </li>
            </ol>
            <ol className="carousel__navigation-list">
                <li className="carousel__navigation-item">
                    <a 
                        href="#carousel__slide1" 
                        className="carousel__navigation-button" 
                        ref={firstButton}
                        onClick={(e)=>setSlideTo(1, e)}
                    >
                        Go to slide 1
                    </a>
                </li>
                <li className="carousel__navigation-item">
                    <a 
                        href="#carousel__slide2" 
                        className="carousel__navigation-button" 
                        ref={secondButton}
                        onClick={(e)=>setSlideTo(2, e)}
                    >
                        Go to slide 2
                    </a>
                </li>
                <li className="carousel__navigation-item">
                    <a 
                        href="#carousel__slide3" 
                        className="carousel__navigation-button" 
                        ref={thirdButton}
                        onClick={(e)=>setSlideTo(3, e)}
                    >
                        Go to slide 3
                    </a>
                </li>
                <li className="carousel__navigation-item">
                    <a 
                        href="#carousel__slide4" 
                        className="carousel__navigation-button" 
                        ref={fourthButton}
                        onClick={(e)=>setSlideTo(4, e)}
                    >
                        Go to slide 4
                    </a>
                </li>
            </ol>
        </section>

    )

}