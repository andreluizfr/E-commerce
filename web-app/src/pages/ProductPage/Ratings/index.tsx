import './styles.css';

import { HTMLAttributes, useEffect, useState } from "react";

import RatingStars from '../../../components/RatingStars';

import Rating from 'types/rating';


interface RatingsProps extends HTMLAttributes<HTMLDivElement> {
    productId?: string
}

const ratingsMock = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
        userId: "5",
        productId: "123",
        variation: {cor: "preto", tamanho: "G"},
        rating: 4,
        comment: "achei bonito.",
        hasMidia: true,
        midias: [
            {type:"image", url:"https://images.tcdn.com.br/img/img_prod/747002/chinelo_slide_hoshwear_arco_iris_unissex_635_1_20220718102049.jpg"},
            {type:"image", url:"https://images.tcdn.com.br/img/img_prod/747002/chinelo_slide_hoshwear_arco_iris_unissex_635_2_20220718102104.jpg"},
            {type:"image", url:"https://images.tcdn.com.br/img/editor/up/747002/cat_hswr_web_214xc7_6.jpg"},
            {type:"image", url:"https://cf.shopee.com.br/file/32ee0ddb6b5b00d16bea44b4a0bee2bf"}
        ],
        created_at: new Date("Sat Feb 18 2023 22:17:27 GMT-0300 (Horário Padrão de Brasília)")
    }
] as Rating[];

export default function Ratings (props: RatingsProps) : JSX.Element {

    const [ratings, setRatings] = useState(ratingsMock);

    useEffect(()=>{

    }, []);

    function openMidia(event: React.MouseEvent <HTMLImageElement>, midiaUrl: string, ratingId: string){
        //tirar selected de todas as midias do site
        const midias = document.getElementsByClassName("Midia");
        Array.from(midias).forEach(midia=>{
            midia.setAttribute("selected", "false");
        });
        //colocando selected pra true na midia que foi selecionada para aplicar borda vermelha so nela pelo css
        const midiaSelected = event.target as HTMLImageElement;
        midiaSelected.setAttribute("selected", "true");

        //fechar todas as midias abertas pelo site
        const openMidiaElements = document.getElementsByClassName("OpenMidia");
        Array.from(openMidiaElements).forEach(openMidiaElement=>{
            openMidiaElement.setAttribute("data-state", "close");
        });

        //mudando data-state pra open pra deixar elemento visivel pelo css e atribuindo a url certa
        const midiaElement = document.getElementById("openMidia"+ratingId) as HTMLImageElement;
        midiaElement.src = midiaUrl;
        midiaElement.setAttribute("data-state", "open");
    }

    if(props.productId)
        return(
            <div className='RatingsWrapper'>
                {
                ratings.map(rating=>{
                    return(
                        
                        <div className='Rating-container' key={rating.id}>

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
                                
                                {rating.hasMidia &&
                                    <div className='Row-5'>
                                        <div className='Midias'>
                                            {
                                                rating.midias.map((midia, index)=>{
                                                    return (
                                                        <img
                                                            className="Midia"
                                                            src={midia.url} 
                                                            alt="imagem de avaliação" 
                                                            key={rating.userId+(index+1)}
                                                            onClick={(e)=>openMidia(e,midia.url, rating.id)}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                        <img
                                            className='OpenMidia'
                                            id={"openMidia"+rating.id}
                                            src={''}
                                            alt="imagem de avaliação ampliada" 
                                        />
                                    </div>
                                }

                            </div>
                            
                        </div>
                    )
                })
                }
            </div>
                
        );
    else
        return <div>Nenhuma avaliação encontrada</div>;
}
