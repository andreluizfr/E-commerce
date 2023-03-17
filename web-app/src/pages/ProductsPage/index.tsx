import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";

import GetProducts from 'queries/Product/public/GetProducts';
import RatingStars from 'components/RatingStars';
import LoadingPage from 'pages/LoadingPage';

export default function ProductsPage () : JSX.Element {

    const { search } = useLocation();

    const query = useMemo(()=>{
        const searchParams = new URLSearchParams(search);
        let queryString = "?";

        if(searchParams.get("categoria"))
            queryString = queryString+"categoria="+searchParams.get("categoria")+"&";

        if(searchParams.get("keyword"))
            queryString = queryString+"keyword="+searchParams.get("categoria")+"&";

        if(searchParams.get("ordem")){
            console.log("aqui");
            queryString = queryString+"ordem="+searchParams.get("ordem")+"&";
        }
    
        if(queryString[queryString.length-1] === "&")
            queryString = queryString.substring(0, queryString.length-1);

        return queryString;
    }, [search]);

    const getProductsQuery = GetProducts(query);

    //atualizar produtos quando a query mudar
    useEffect(()=>{
        console.log(query);
        getProductsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return(
        <div className='ProductsPage'>
            <NavBar/>

            <main className='ProductsPage-container'>
                <nav className='ClassifyBy-options'>
                    <span className='ClassifyBy-title'>Classificar por:</span>
                    <button className='Classify-button'>Popular</button>
                    <button className='Classify-button'>Mais recentes</button>
                    <button className='Classify-button'>Em destaque</button>
                    <button className='Classify-button'>Crescente</button>
                    <button className='Classify-button'>Decrescente</button>
                </nav>

                <div className='Products-container'>
                    <aside className='Products-menu'>
                        <div className='Categories'>
                            <header className='Categories-title'>
                                Categorias
                            </header>

                            <span className='Category'>Roupas masculinas</span>
                            <span className='Category'>Roupas femininas</span>
                            <span className='Category'>Telefonia</span>
                            <span className='Category'>Computadores</span>
                            <span className='Category'>Eletrônicos</span>
                            <span className='Category'>Utensílios para casa</span>
                            <span className='Category'>Casa e decoração</span>
                            <span className='Category'>Bolsas e calçados</span>
                            <span className='Category'>Jóias e relógios</span>
                            <span className='Category'>Saúde e beleza</span>
                            <span className='Category'>Pets</span>
                            <span className='Category'>Brinquedos e hobbies</span>
                            <span className='Category'>Bebês</span>
                            <span className='Category'>Esportes</span>
                            <span className='Category'>Ferramentas e construção</span>
                            <span className='Category'>Papelaria</span>
                        </div>

                        <div className='Filters'>
                            <header className='Filters-title'>
                                Filtros
                            </header>

                            <section className='Price-section'>
                                <header className='Price-section-title'>Faixa de preço</header>

                                <div className='Prices'>
                                    <input className='Price' placeholder='R$ mín'/>
                                    <span className='Separator'></span>
                                    <input className='Price' placeholder='R$ máx'/>
                                </div>

                                <button className='PriceFilter-button'>Filtrar</button>
                            </section>

                            <section className='Brand-section'>
                                <header className='Brand-section-title'>Marcas</header>
                                
                                <div className='Brand-wrapper'>
                                    <input className='Brand-checkbox' type='checkbox'/>
                                    <span className='Brand'>Marca A</span>
                                </div>
                                
                                <div className='Brand-wrapper'>
                                    <input className='Brand-checkbox' type='checkbox'/>
                                    <span className='Brand'>Marca B</span>
                                </div>

                                <div className='Brand-wrapper'>
                                    <input className='Brand-checkbox' type='checkbox'/>
                                    <span className='Brand'>Marca C</span>
                                </div>

                                <div className='Brand-wrapper'>
                                    <input className='Brand-checkbox' type='checkbox'/>
                                    <span className='Brand'>Marca D</span>
                                </div>

                                <div className='Brand-wrapper'>
                                    <input className='Brand-checkbox' type='checkbox'/>
                                    <span className='Brand'>Marca E</span>
                                </div>
                            </section>

                            <section className='Rating-section'>
                                <header className='Rating-section-title'>Avaliações</header>

                                <RatingStars rate={5} size="small"/>
                                <RatingStars rate={4} size="small"/>
                                <RatingStars rate={3} size="small"/>
                                <RatingStars rate={2} size="small"/>
                                <RatingStars rate={1} size="small"/>
                            </section>
                        </div>
                    </aside>

                    {getProductsQuery.isFetching?
                        <LoadingPage/>
                        :
                        <main className='Products'> 
                            {getProductsQuery.data?.products?.map(product=>
                                <ProductCard product={product} key={product.productId}/>
                            )}
                        </main>
                    }
                </div>
            </main>

            <Footer/>
        </div>
    );
}