import './styles.css';
import * as Tabs from '@radix-ui/react-tabs';
import Toolbar from './Toolbar';

import { useState, useEffect } from 'react';

import GetProductsAdmin from 'queries/Product/admin/GetProductsAdmin';
import refreshToken from 'queries/User/public/RefreshToken';
import Product from 'types/product';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import ProductsList from './ProductsList.tsx';


export default function Products () : JSX.Element {

    const [query, setQuery] = useState("?");
    const [queryObject, setQueryObject] = useState(
        {
            status: "",
            category: "",
            keyword: "",
            order: "ASC"
        }
    );
    const [products, setProducts] = useState <Product[]>([]);
    
    const getProductsAdminQuery = GetProductsAdmin(query);
    const dispatch = useDispatch();

    //transforma a queryObject em query
    useEffect(()=>{
        let queryString = "?";

        if(queryObject.status.length > 0)
            queryString = queryString+"status="+queryObject.status+"&";

        if(queryObject.category.length > 0)
            queryString = queryString+"categoria="+queryObject.category+"&";
        
        if(queryObject.keyword.length > 0)
            queryString = queryString+"keyword="+queryObject.keyword+"&";
    
        if(queryObject.order.length > 0)
            queryString = queryString+"order="+queryObject.order+"&";

        if(queryString[queryString.length-1] === "&")
            queryString = queryString.substring(0, queryString.length-1);
        setQuery(queryString);
    }, [queryObject]);

    //atualizar produtos quando a query mudar
    useEffect(()=>{
        console.log(query);
        getProductsAdminQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    //controlador da resposta da query getProductsAdmin
    useEffect(()=>{

        if(getProductsAdminQuery.data)
            console.log(getProductsAdminQuery.data?.message);
            
        if(getProductsAdminQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) getProductsAdminQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 2000);
                }
            });
        else if(getProductsAdminQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 2000);
        }
        else if(getProductsAdminQuery.data?.success && getProductsAdminQuery.data?.products)
            setProducts(getProductsAdminQuery.data.products);
            
    }, [dispatch, getProductsAdminQuery, getProductsAdminQuery.data]);


    function setStatusQuery (event: React.MouseEvent <HTMLButtonElement>){
        const statusValue = (event.target as HTMLButtonElement).innerText.toLocaleLowerCase();

        if(statusValue === "Todos" || statusValue === "todos")
            setQueryObject({
                status: "",
                category: "",
                keyword: "",
                order: "ASC"
            });
        else
            setQueryObject({
                status: statusValue,
                category: "",
                keyword: "",
                order: "ASC"
            });
    }

    //sempre que um produto for excluido, vai buscar os produtos novamente
    const [refreshProducts, setRefreshProducts] = useState(false);
    useEffect(()=>{
        if(refreshProducts === true){
            getProductsAdminQuery.refetch();
            setRefreshProducts(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshProducts]);

    return(
        <div className='ProductsComponent'>
            <Tabs.Root className="TabsRoot" defaultValue="Todos">

                <Tabs.List className="TabsList">
                    <Tabs.Trigger className="TabsTrigger" value="Todos" onClick={setStatusQuery}>
                        Todos
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="Rascunho" onClick={setStatusQuery}>
                        Rascunho
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="Ativo" onClick={setStatusQuery}>
                        Ativo
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="Desativado" onClick={setStatusQuery}>
                        Desativado
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content className="TabsContent" value="Todos">
                    <Toolbar queryObject={queryObject} setQueryObject={setQueryObject}/>
                    <ProductsList products={products} setRefreshProducts={setRefreshProducts}/>
                </Tabs.Content>

                <Tabs.Content className="TabsContent" value="Rascunho">
                    <Toolbar queryObject={queryObject} setQueryObject={setQueryObject}/>
                    <ProductsList products={products} setRefreshProducts={setRefreshProducts}/>
                </Tabs.Content>

                <Tabs.Content className="TabsContent" value="Ativo">
                    <Toolbar queryObject={queryObject} setQueryObject={setQueryObject}/>
                    <ProductsList products={products} setRefreshProducts={setRefreshProducts}/>
                </Tabs.Content>
                    
                <Tabs.Content className="TabsContent" value="Desativado">
                    <Toolbar queryObject={queryObject} setQueryObject={setQueryObject}/>
                    <ProductsList products={products} setRefreshProducts={setRefreshProducts}/>
                </Tabs.Content>

            </Tabs.Root>

        </div>
    );
}