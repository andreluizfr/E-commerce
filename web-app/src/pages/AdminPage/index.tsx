import './styles.css';
import NavBar from 'components/NavBar';
import MenuAccordion from './MenuAccordion';
import React, { useState, useEffect } from 'react';

import LoadingPage from 'pages/LoadingPage';
const Start = React.lazy(() => import('./Start'));
const Products = React.lazy(() => import('./Products'));
const AddProduct = React.lazy(() => import('./AddProduct'));
const Collections = React.lazy(() => import('./Collections'));

export default function AdminPage () : JSX.Element {

    const [pageState, setPageState] = useState("Start");

    useEffect(()=>{
        console.log(pageState);
    }, [pageState]);

    return(
        <div className='AdminPage'>
            <NavBar/>
            <main className='AdminPage-container'>
                <MenuAccordion setPageState={setPageState}/>

                <React.Suspense fallback={<LoadingPage/>}>
                    {pageState === "Start"? <Start/> : null}
                    {pageState === "Products"? <Products/> : null}
                    {pageState === "AddProduct"? <AddProduct/> : null}
                    {pageState === "Collections"? <Collections/> : null}
                </React.Suspense>
            </main>
        </div>
    );
}
