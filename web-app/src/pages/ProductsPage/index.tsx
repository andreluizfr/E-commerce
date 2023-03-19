import './styles.css';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import ProductCard from 'components/ProductCard';
import PulseLoader from "react-spinners/PulseLoader";

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import GetProducts from 'queries/Product/public/GetProducts';
import RatingStars from 'components/RatingStars';
import Product from 'types/product';

export default function ProductsPage () : JSX.Element {

    const navigate = useNavigate();
    const { search } = useLocation();

    const query = useMemo(()=>{

        const searchParams = new URLSearchParams(search);

        let queryString = "?";

        if(searchParams.get("categoria"))
            queryString = queryString+"categoria="+searchParams.get("categoria")+"&";

        if(searchParams.get("keyword"))
            queryString = queryString+"keyword="+searchParams.get("keyword")+"&";

        if(searchParams.get("order"))
            queryString = queryString+"ordem="+searchParams.get("order")+"&";
    
        if(queryString[queryString.length-1] === "&")
            queryString = queryString.substring(0, queryString.length-1);

        return queryString;
    }, [search]);

    //começar categorias com active = false
    useEffect(()=>{
        const searchParams = new URLSearchParams(search);

        const categories = document.getElementsByClassName("Category");
        Array.from(categories).forEach(category=>{
            if(category.innerHTML === searchParams.get("categoria"))
                category.setAttribute("active", "true")
            else
                category.setAttribute("active", "false")
        });
    }, [search]);

    const [products, setProducts] = useState([] as Product[]);

    const getProductsQuery = GetProducts(query);

    useEffect(()=>{
        console.log("query:",query);
        getProductsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(()=>{
        if(getProductsQuery.data)
            setProducts(getProductsQuery.data.products);
    }, [getProductsQuery.data]);

    const [filteredProducts, setFilteredProducts] = useState([] as Product[]);

    const [filters, setFilters] = useState<{price: [number, number] | null, brand: string |  null, rating: number | null}>({
        price: null,
        brand: null,
        rating: null
    });

    useEffect(()=>{
        console.log("filters:",filters);
        let filteredProducts = [...products];

        if(filters.price)
            filteredProducts = filteredProducts.filter(product=>
                product.price && filters.price && (product.price >= filters.price[0]) && (product.price <= filters.price[1])
            );
        /*
        if(filters.brand)
            filteredProducts = filteredProducts.filter(product=>

            );
        */
        if(filters.rating)
            filteredProducts = filteredProducts.filter(product=>
                product.rating && filters.rating && (product.rating >= filters.rating)
            );
        
        setFilteredProducts([...filteredProducts]);

    }, [filters, products]);

    const [sortedProducts, setSortedProducts] = useState([] as Product[]);

    const [sorting, setSorting] = useState<{
        price: string | null,
        brand: string |  null,
        rating: string | null,
        sales: string | null
        created_at: string | null
    }>({
        price: null,
        brand: null,
        rating: null,
        sales: null,
        created_at: null,
    });

    useEffect(()=>{
        console.log("sorting:",sorting);
        let sortedProducts = [...filteredProducts];

        if(sorting.price){
            if(sorting.price === "ASC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.price && b.price)
                        return a.price > b.price?1:-1;
                    else return 0;
                });
            else if(sorting.price === "DESC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.price && b.price)
                        return a.price < b.price?1:-1;
                    else return 0;
                });
        }
        /*
        else if(sorting.brand)

        */
        else if(sorting.rating){
            if(sorting.rating === "ASC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.rating && b.rating)
                        return a.rating > b.rating?1:-1;
                    else return 0;
                });
            else if(sorting.rating === "DESC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.rating && b.rating)
                        return a.rating < b.rating?1:-1;
                    else return 0;
                });
        }

        else if(sorting.sales){
            if(sorting.sales === "ASC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.sales && b.sales)
                        return a.sales > b.sales?1:-1;
                    else return 0;
                });
            else if(sorting.sales === "DESC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.sales && b.sales)
                        return a.sales < b.sales?1:-1;
                    else return 0;
                });
        }
        
        else if(sorting.created_at){
            if(sorting.created_at === "ASC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.created_at && b.created_at)
                        return a.created_at > b.created_at?1:-1;
                    else return 0;
                });
            else if(sorting.created_at === "DESC")
                sortedProducts = sortedProducts.sort((a,b)=> {
                    if(a.created_at && b.created_at)
                        return a.created_at < b.created_at?1:-1;
                    else return 0;
                });
        }

        setSortedProducts([...sortedProducts]);

    }, [sorting, filteredProducts]);

    function addCategoryToQuery(event: React.MouseEvent <HTMLSpanElement>, category: string){

        const el = event.target as HTMLSpanElement;

        const searchParams = new URLSearchParams(search);
        let queryString = "?";

        if(el.getAttribute("active") === "false") //se já é falso, torno true e adiciono a categoria na query
            queryString = queryString+"categoria="+category+"&";

        if(searchParams.get("keyword"))
            queryString = queryString+"keyword="+searchParams.get("keyword")+"&";

        if(searchParams.get("order"))
            queryString = queryString+"ordem="+searchParams.get("order")+"&";
    
        if(queryString[queryString.length-1] === "&")
            queryString = queryString.substring(0, queryString.length-1);

        resetSorting();
        navigate("/produtos"+queryString);

    }

    function setPriceFilter(){
        const minPrice = (document.getElementById("minPriceFilter") as HTMLInputElement).value;
        const maxPrice = (document.getElementById("maxPriceFilter") as HTMLInputElement).value;

        if((minPrice.length > 0) && (maxPrice.length > 0)){
            if(Number(minPrice)<=Number(maxPrice))
                setFilters({...filters, price:[Number(minPrice), Number(maxPrice)]});
            else
                alert('A ordem dos preços está invertida.');
        }
        else if(((minPrice.length === 0) && (maxPrice.length === 0)))
            setFilters({...filters, price: null});
        else
            alert('Preencha os dois campos do preço.');

        resetSorting();
    }
    /*
    function setBrandFilter(){

    }
    */
    function setRatingFilter(event: React.MouseEvent<HTMLDivElement>, rating: number){

        const el = event.target as HTMLDivElement;

        const ratingSection = document.getElementsByClassName("Rating-section")[0];
        const ratings = ratingSection.getElementsByClassName("RatingStars");
        Array.from(ratings).forEach(ratingStars=>ratingStars.setAttribute("active", "false"));

        if(el.getAttribute("active") === "false"){

            el.setAttribute("active", "true");
            setFilters({...filters, rating: rating});

        } else if(el.getAttribute("active") === "true"){

            el.setAttribute("active", "false");
            setFilters({...filters, rating: null});

        }
        
        resetSorting();
    }

    function setClassifyByPopular(event: React.MouseEvent<HTMLButtonElement>){
        const buttons = document.getElementsByClassName("Classify-button");
        Array.from(buttons).forEach(button=>button.setAttribute("active", "false"));

        const el = event.target as HTMLButtonElement;
        if(el.getAttribute("active") === "false"){
            el.setAttribute("active", "true");
            if(!sorting.sales)
                setSorting({
                    price: null,
                    brand: null,
                    rating: null,
                    sales: "ASC", 
                    created_at: null
                });
        } else 
            setSorting({
                price: null,
                brand: null,
                rating: null,
                sales: null, 
                created_at: null
            });

    }

    //por enquanto igual a classificação popular
    function setClassifyByHighlighted(event: React.MouseEvent<HTMLButtonElement>){
        const buttons = document.getElementsByClassName("Classify-button");
        Array.from(buttons).forEach(button=>button.setAttribute("active", "false"));

        const el = event.target as HTMLButtonElement;
        if(el.getAttribute("active") === "false"){
            el.setAttribute("active", "true");
            if(!sorting.sales)
                setSorting({
                    price: null,
                    brand: null,
                    rating: null,
                    sales: "ASC", 
                    created_at: null
                });
        } else 
            setSorting({
                price: null,
                brand: null,
                rating: null,
                sales: null, 
                created_at: null
            });
        
    }

    function setClassifyByASC_DESC(event: React.MouseEvent<HTMLButtonElement>, order: "ASC" | "DESC"){
        const buttons = document.getElementsByClassName("Classify-button");
        Array.from(buttons).forEach(button=>button.setAttribute("active", "false"));

        const el = event.target as HTMLButtonElement;
        if(el.getAttribute("active") === "false"){
            el.setAttribute("active", "true");
            if(filters.price)
                setSorting({
                    price: order,
                    brand: null,
                    rating: null,
                    sales: null, 
                    created_at: null
                });
            /*
            else if(filters.brand)
                setSorting({
                    price: null,
                    brand: order,
                    rating: null,
                    sales: null, 
                    created_at: null
                });
            */
           else if(filters.rating){
                setSorting({
                    price: null,
                    brand: null,
                    rating: order,
                    sales: null, 
                    created_at: null
                });
           }
           else{
                setSorting({
                    price: null,
                    brand: null,
                    rating: null,
                    sales: null, 
                    created_at: order
                });
           }
        } else 
            setSorting({
                price: null,
                brand: null,
                rating: null,
                sales: null, 
                created_at: null
            });
    }

    function resetSorting(){
        const buttons = document.getElementsByClassName("Classify-button");
        Array.from(buttons).forEach(button=>button.setAttribute("active", "false"));

        setSorting({
            price: null,
            brand: null,
            rating: null,
            sales: null, 
            created_at: null
        });
    }

    return(
        <div className='ProductsPage'>
            <NavBar/>

            <main className='ProductsPage-container'>
                <nav className='ClassifyBy-options'>
                    <span className='ClassifyBy-title'>Classificar por:</span>
                    <button className='Classify-button' onClick={(e)=>setClassifyByPopular(e)}>Popular</button>
                    <button className='Classify-button' onClick={(e)=>setClassifyByHighlighted(e)}>Em destaque</button>
                    <button className='Classify-button' onClick={(e)=>setClassifyByASC_DESC(e,"ASC")}>Crescente</button>
                    <button className='Classify-button' onClick={(e)=>setClassifyByASC_DESC(e,"DESC")}>Decrescente</button>
                </nav>

                <div className={getProductsQuery.isFetching?'Products-container AlignCenter':'Products-container'}>
                    <aside className='Products-menu'>
                        <div className='Categories'>
                            <header className='Categories-title'>
                                Categorias
                            </header>

                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Roupas masculinas")}>Roupas masculinas</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Roupas femininas")}>Roupas femininas</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Telefonia")}>Telefonia</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Computadores")}>Computadores</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Eletrônicos")}>Eletrônicos</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Utensílios para casa")}>Utensílios para casa</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Casa e decoração")}>Casa e decoração</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Bolsas e calçados")}>Bolsas e calçados</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Jóias e relógios")}>Jóias e relógios</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Saúde e beleza")}>Saúde e beleza</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Pets")}>Pets</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Brinquedos e hobbies")}>Brinquedos e hobbies</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Bebês")}>Bebês</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Esportes")}>Esportes</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Ferramentas e construção")}>Ferramentas e construção</span>
                            <span className='Category' onClick={(e)=>addCategoryToQuery(e,"Papelaria")}>Papelaria</span>
                        </div>

                        <div className='Filters'>
                            <header className='Filters-title'>
                                Filtros
                            </header>

                            <section className='Price-section'>
                                <header className='Price-section-title'>Faixa de preço</header>

                                <div className='Prices'>
                                    <input className='Price' placeholder='R$ mín' id='minPriceFilter'/>
                                    <span className='Separator'></span>
                                    <input className='Price' placeholder='R$ máx' id='maxPriceFilter'/>
                                </div>

                                <button className='PriceFilter-button' onClick={setPriceFilter}>Filtrar</button>
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

                                <RatingStars rate={5} size="small" active="false" onClick={(e)=>setRatingFilter(e,5)}/>
                                <RatingStars rate={4} size="small" active="false" onClick={(e)=>setRatingFilter(e,4)}/>
                                <RatingStars rate={3} size="small" active="false" onClick={(e)=>setRatingFilter(e,3)}/>
                                <RatingStars rate={2} size="small" active="false" onClick={(e)=>setRatingFilter(e,2)}/>
                                <RatingStars rate={1} size="small" active="false" onClick={(e)=>setRatingFilter(e,1)}/>
                            </section>
                        </div>
                    </aside>

                    {getProductsQuery.isFetching?
                        <div className='Loading'>
                            <PulseLoader size={15} color="#000000"/>
                        </div>
                        :
                        <main className='Products'> 
                            {sortedProducts.map(product=>
                                <ProductCard product={product} key={product.productId} onClick={()=>navigate('/produto/'+product.productId)}/>
                            )}
                        </main>
                    }
                </div>
            </main>

            <Footer/>
        </div>
    );
}