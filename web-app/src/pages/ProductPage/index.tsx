import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import RatingStars from 'components/RatingStars';
import NotFoundPage from 'pages/NotFoundPage';
import ProgressionBar from './ProgressionBar';
import Ratings from './Ratings';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { addProduct } from 'store/features/cartSlice';

import Product from 'types/product';
import GetProduct from 'queries/Product/public/GetProduct';

export default function ProductPage () : JSX.Element {

    let { productId } = useParams();

    const getProductQuery = GetProduct(productId);
    const [product, setProduct] = useState <Product | null>(null);
    const [selectedAttributes, setSelectedAttributes] = useState<{[key: string]: string}>({});

    const dispatch = useDispatch();

    const [animateCart, setAnimateCart] = useState(false);
    const [mainMidiaIndex, setMainMidiaIndex] = useState(0);

    useEffect(()=>{
        if(getProductQuery.data?.success && getProductQuery.data.product){
            console.log(getProductQuery.data?.message);
            console.log(getProductQuery.data.product);
            setProduct(getProductQuery.data.product);
        }
    }, [getProductQuery.data]);

    function setMidiaToMain(event: React.MouseEvent <HTMLImageElement>, index: number){
        const secondaryMidias = document.getElementsByClassName("SecondaryMidia");
        Array.from(secondaryMidias).forEach(secondaryMidia=>secondaryMidia.setAttribute("selected", "false"));

        const secondaryMidiaElement = event.target as HTMLImageElement;
        secondaryMidiaElement.setAttribute("selected", "true");
        
        setMainMidiaIndex(index);
    }

    function selectValue (event: React.MouseEvent<HTMLElement>){

        const value = (event.target as HTMLElement);
        const parent = value.parentElement;
        const values = parent?.children;

        if(values)
            for(let i=0; i<values?.length; i+=1){
                values[i].setAttribute("selected", "false");
            }

        value.setAttribute("selected", "true");
        
        const parentparent = parent?.parentElement;
        
        if(parentparent)
            updateSelectedAttributes(parentparent.id, value.innerText);

    }

    function updateSelectedAttributes (name: string, value: string){
        setSelectedAttributes({...selectedAttributes, [name]: value});
    }

    function addToCart () {
        if(product && product.hasAttributes){
            if(Object.keys(selectedAttributes).length === product.attributes?.length){
                setProduct({...product, variation: selectedAttributes});
                dispatch(addProduct({...product, variation: selectedAttributes}));
                
                setAnimateCart(true);
                setTimeout(()=>setAnimateCart(false), 1000);
            } else{
                const notAllAttributesSelected = document.getElementsByClassName("NotAllAttributesSelectedWarning")[0];
                notAllAttributesSelected.setAttribute("visible", "true");
                setTimeout(()=>notAllAttributesSelected.setAttribute("visible", "false"), 3000);
            }
        } else if(product){
            dispatch(addProduct(product));

            setAnimateCart(true);
            setTimeout(()=>setAnimateCart(false), 1000);
        }
    }

    if(product)
        return(
            <div className='ProductPage'>
                <NavBar animateCart={animateCart}/>

                <main className='ProductPage-container'>
                    <div className="Grid-wrapper">

                        <section className="First-section">
                            <img 
                                src={product.midias[mainMidiaIndex].url} 
                                alt={product.title+mainMidiaIndex} 
                                className={"MainMidia MidiaAttribute-"+product.midias[mainMidiaIndex].attributeValue}
                                key={"midia"+mainMidiaIndex}
                            />
                            <div className='OthersMidias'>
                                {
                                    product.midias.map((midia, index)=>
                                        <img 
                                            src={midia.url} 
                                            alt={product.title+index} 
                                            className={"SecondaryMidia MidiaAttribute-"+midia.attributeValue}
                                            key={"midia"+index}
                                            onClick={(e)=>setMidiaToMain(e, index)}
                                            onMouseOver={(e)=>setMidiaToMain(e, index)}
                                        />
                                    )
                                }
                            </div>
                        </section>

                        <section className="Second-section">

                            <header className="Row-1">
                                <span className="Title">{product.title}</span>
                            </header>

                            <div className="Row-2">
                                <span className="Price">R${product.price}</span>
                                <RatingStars rate={product.rating} size="medium"/>
                            </div>

                            <div className="Row-3">
                                {product.hasAttributes &&
                                    <div className="Attributes-container">
                                        {   
                                            product.attributes.map((attribute)=>
                                                <div 
                                                    className="Attribute" 
                                                    id={attribute.name} 
                                                    key={attribute.name}
                                                >
                                                    <span className="Name">
                                                        {attribute.name}
                                                    </span>

                                                    <div className="Values">
                                                        {
                                                            attribute.values.map(value => 
                                                                <span 
                                                                    className={'Value '+attribute.name} 
                                                                    key={value}
                                                                    onClick={selectValue}
                                                                >
                                                                    {value}
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                
                                            )
                                        }
                                    </div>
                                }
                            </div>

                            <div className="Row-4">
                                <button className="Add-to-cart" onClick={addToCart}>
                                    Adicionar ao carrinho
                                </button>

                                <button className="Buy">
                                    Compre já
                                </button>
                            </div>

                            <div className="Row-5">
                                <p className="NotAllAttributesSelectedWarning">Por favor, selecione todos atributos do produto!</p>
                            </div>

                            <div className="Row-6">
                                <p className="Warning">
                                    Os prazos de entrega contam a partir da confirmação do 
                                    pagamento podendo variar dependendo da quantidadede
                                    um mesmo produto. 
                                </p>
                            </div>
                            
                        </section>

                        <section className="Third-section">

                            <header className="Title">
                                Detalhes do produto
                            </header>

                            <div className="Description" dangerouslySetInnerHTML={{__html: product.description}}>
                            </div>

                        </section>
                        
                        <section className="Fourth-section">

                            <header className='Title'>
                                Avaliações
                            </header>

                            <div className='Ratings'>

                                <div className='Rating-value'>
                                    {product.rating?
                                        <span className='Value'>{product.rating.toFixed(2)}</span>
                                        :
                                        null
                                    }
                                    <RatingStars rate={product.rating} size="large"/>
                                </div>

                                <div className='Rating-data'>
                                    <div className='Rating-data-wrapper'>
                                        <span className='Rating-number'>5 estrelas</span>
                                        <ProgressionBar number="5" ratingNumbers={product.ratingNumbers}/>
                                    </div>

                                    <div className='Rating-data-wrapper'>
                                        <span className='Rating-number'>4 estrelas</span>
                                        <ProgressionBar number="4" ratingNumbers={product.ratingNumbers}/>
                                    </div>

                                    <div className='Rating-data-wrapper'>
                                        <span className='Rating-number'>3 estrelas</span>
                                        <ProgressionBar number="3" ratingNumbers={product.ratingNumbers}/>
                                    </div>

                                    <div className='Rating-data-wrapper'>
                                        <span className='Rating-number'>2 estrelas</span>
                                        <ProgressionBar number="2" ratingNumbers={product.ratingNumbers}/>
                                    </div>

                                    <div className='Rating-data-wrapper'>
                                        <span className='Rating-number'>1 estrela</span>
                                        <ProgressionBar number="1" ratingNumbers={product.ratingNumbers}/>
                                    </div>
                                </div>

                            </div>
                        
                        </section>

                        <section className="Fifth-section">
                            <Ratings productId={product.productId}/>
                        </section>

                    </div>
                </main>

                <Footer/>
            </div>
        );

    else
        return <NotFoundPage/>
}