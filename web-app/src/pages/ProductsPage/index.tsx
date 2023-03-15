import './styles.css';

import React, { useEffect, useState } from 'react';
import {
    useLocation
  } from "react-router-dom";

import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import Product from 'types/product';
import GetProducts from 'queries/Product/public/GetProducts';
import ProductCard from 'components/ProductCard';

export default function ProductsPage () : JSX.Element {

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const query = useQuery();
    const [queryString, setQueryString] = useState("?");

    const getProductsQuery = GetProducts(queryString);

    useEffect(()=>{
        let queryString = "?";

        if(query.get("categoria"))
            queryString = queryString+"categoria="+query.get("categoria")+"&";

        if(query.get("keyword"))
            queryString = queryString+"keyword="+query.get("categoria")+"&";

        if(query.get("ordem")){
            console.log("aqui");
            queryString = queryString+"ordem="+query.get("ordem")+"&";
        }
    
        if(queryString[queryString.length-1] === "&")
            queryString = queryString.substring(0, queryString.length-1);

        setQueryString(queryString);
    }, []);

    //atualizar produtos quando a query mudar
    useEffect(()=>{
        console.log(queryString);
        getProductsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    

    return(
        <div className='ProductsPage'>
            <NavBar/>

            <div className='ProductsPage-container'>
                {getProductsQuery.data?.products?.map(product=>
                    <ProductCard product={product} key={product.productId}/>
                )}
            </div>

            <Footer/>
        </div>
    );
}