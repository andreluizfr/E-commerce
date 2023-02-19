import './styles.css';

import { HTMLAttributes, useEffect, useState } from "react";

import RatingStars from '../RatingStars';

import Rating from 'types/rating';


interface RatingsProps extends HTMLAttributes<HTMLDivElement> {

}

const ratingsMock = [
    {
        ratingId: "1",
        userId: "5",
        productId: "123",
        variation: {cor: "azul", tamanho: "P"},
        rating: 4,
        comment: "achei legal.",
        hasMidia: false,
        midias: [],
        created_at: new Date("Sat Feb 18 2023 22:17:27 GMT-0300 (Horário Padrão de Brasília)")
    },
    {
        ratingId: "2",
        userId: "5",
        productId: "123",
        variation: {cor: "amarelo", tamanho: "M"},
        rating: 1,
        comment: "achei uma merda.",
        hasMidia: false,
        midias: [],
        created_at: new Date("Sat Feb 18 2023 22:17:27 GMT-0300 (Horário Padrão de Brasília)")
    },
    {
        ratingId: "3",
        userId: "5",
        productId: "123",
        variation: {cor: "preto", tamanho: "G"},
        rating: 4,
        comment: "achei bonito.",
        hasMidia: true,
        midias: [
            {type:"image", url:"https://live.staticflickr.com/4577/37942236145_78d9979517_b.jpg"},
            {type:"image", url:"https://live.staticflickr.com/4577/37942236145_78d9979517_b.jpg"},
            {type:"image", url:"https://live.staticflickr.com/4577/37942236145_78d9979517_b.jpg"}
        ],
        created_at: new Date("Sat Feb 18 2023 22:17:27 GMT-0300 (Horário Padrão de Brasília)")
    }
] as Rating[];

export default function Ratings (props: RatingsProps) : JSX.Element {

    const [ratings, setRatings] = useState(ratingsMock);

    useEffect(()=>{

    }, []);

    function openCarousel(event: React.MouseEvent <HTMLImageElement>, index: number, maxLength: number){
        const image = event.target as HTMLImageElement;
        const carousel = image.parentElement?.parentElement;
        carousel?.setAttribute("carousel", "true");
        carousel?.setAttribute("index", String(index));

        carousel?.setAttribute("maxLength", String(maxLength));
    }

    function closeCarousel(event: React.MouseEvent <HTMLDivElement>){
        const midia = event.target as HTMLDivElement;
        const carousel = midia.parentElement;
        carousel?.setAttribute("carousel", "false");
        carousel?.setAttribute("index", "-1");
    }

    function carouselToLeft(event: React.MouseEvent <HTMLButtonElement>){
        const button = event.target as HTMLDivElement;
        const carousel = button.parentElement?.parentElement;
        const index = Number(carousel?.getAttribute("index"));
        if(index > 1)
            carousel?.setAttribute("index", String(index-1));
    }

    function carouselToRight(event: React.MouseEvent <HTMLButtonElement>){
        const button = event.target as HTMLDivElement;
        const carousel = button.parentElement?.parentElement;
        const index = Number(carousel?.getAttribute("index"));
        const maxLength = Number(carousel?.getAttribute("maxLength"));
        if(index < maxLength)
            carousel?.setAttribute("index", String(index+1));
    }

    return(
        <div className='RatingsWrapper'>
            {
            ratings.map(rating=>{
                return(
                    
                    <div className='Rating-container' key={rating.ratingId}>

                        <img className='User-picture' alt='imagem de perfil do usuário' src={'https://www.showmetech.com.br/wp-content/uploads//2021/02/capa-dog-1920x1024.jpg'}/>

                        <div className='Rows'> 
                        
                            <div className='Row-1'>
                                
                                <div className='User-name'>{'André Luiz F.'}</div>

                                <div className='Rating-date'>
                                    <span>{String(rating.created_at.getDate()) + "/"}</span>
                                    <span>
                                        {
                                            (rating.created_at.getMonth() < 9)? 
                                                "0" + String(rating.created_at.getMonth()+1) + "/"
                                                :
                                                String(rating.created_at.getMonth()+1) + "/"
                                        }
                                    </span>
                                    <span>{String(rating.created_at.getFullYear())}</span>
                                </div>
                            </div>

                            <div className='Row-2'>
                                <span>Variação:</span>
                                <span className='Variation'>
                                    {
                                        Object.keys(rating.variation).map(key=>{
                                            return(" " + rating.variation[key] + ", ");
                                        }).map((variationString, index, variationList)=>{
                                            if(index === variationList.length-1)
                                                return variationString.split(",")[0];
                                            else
                                                return variationString;
                                        })
                                    }
                                </span>
                            </div>

                            <div className='Row-3'>
                                <RatingStars rate={rating.rating} size="small"/>
                            </div>

                            <div className='Row-4'>
                                <div className='Comment'> {rating.comment} </div>
                            </div>
                            
                            {
                                rating.hasMidia?
                                    <div className='Row-5'>
                                        {
                                            rating.midias.map((midia, index, midias)=>{
                                                return (
                                                    <div className="Midia" onClick={closeCarousel}>
                                                        <button className='Left' onClick={carouselToLeft}>{"<-"}</button>
                                                        <img 
                                                            src={midia.url} 
                                                            alt="imagem de avaliação" 
                                                            key={rating.userId+(index+1)}
                                                            onClick={(e)=>openCarousel(e,index+1, midias.length)}
                                                        />
                                                        <button className='Right' onClick={carouselToRight}>{"->"}</button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    null
                            }

                        </div>
                        
                    </div>
                )
            })
            }
        </div>
            
    );
}
