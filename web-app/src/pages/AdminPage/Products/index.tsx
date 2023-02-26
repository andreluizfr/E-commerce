import './styles.css';
import * as Tabs from '@radix-ui/react-tabs';
import { useState, useEffect } from 'react';

import GetProductsAdmin from 'queries/GetProductsAdmin';
import refreshToken from 'queries/RefreshToken';
import Product from 'types/product';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import ProductsList from './ProductsList.tsx';


export default function Products () : JSX.Element {

    const [queryObject, setQueryObject] = useState(
        {
            status: "",
            category: "",
            keyword: ""
        }
    );
    const [query, setQuery] = useState("");
    //transforma a queryObject em query
    useEffect(()=>{
        let stringQuery = "?";

        if(queryObject.status.length > 0){
            stringQuery = stringQuery+"status="+queryObject.status+"&";
        }
        if(queryObject.category.length > 0){
            stringQuery = stringQuery+"categoria="+queryObject.category+"&";
        }
        if(queryObject.keyword.length > 0){
            stringQuery = stringQuery+"keyword="+queryObject.keyword+"&";
        }

        stringQuery = stringQuery.substring(0, stringQuery.length-1);
        setQuery(stringQuery);
    }, [queryObject]);

    
    const getProductsAdminQuery = GetProductsAdmin(query);
    const [products, setProducts] = useState <Product[]>([]);
    const dispatch = useDispatch();
    //controlador da resposta da query getProductsAdmin
    useEffect(()=>{

        if(getProductsAdminQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) getProductsAdminQuery.refetch();
                else {
                    dispatch(removeUser());
                    localStorage.removeItem("x-access-token");
                }
            });

        else if(getProductsAdminQuery.data?.success && getProductsAdminQuery.data?.products)
            setProducts(getProductsAdminQuery.data.products);
            
    }, [dispatch, getProductsAdminQuery, getProductsAdminQuery.data]);
    
    useEffect(()=>{
        console.log(query);
        getProductsAdminQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    function setStatusQuery (event: React.MouseEvent <HTMLButtonElement>){
        const statusValue = (event.target as HTMLButtonElement).innerText.toLocaleLowerCase();

        setQueryObject({
            ...queryObject,
            status: statusValue
        });
    }

    function setKeywordQuery (event: React.ChangeEvent <HTMLInputElement>){
        const keywordValue = (event.target as HTMLInputElement).value;

        setQueryObject({
            ...queryObject,
            keyword: keywordValue
        });
    }

    return(
        <div className='ProductsComponent'>
            <Tabs.Root className="TabsRoot" defaultValue="Todos">

                <Tabs.List className="TabsList">
                    <Tabs.Trigger className="TabsTrigger" value="Todos" 
                        onClick={()=>
                            setQueryObject({
                                status: "",
                                category: "",
                                keyword: ""
                            })}
                    >
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
                    <div>
                        <input placeholder='keyword' onChange={setKeywordQuery}/>
                    </div>
                    <ProductsList products={products}/>
                </Tabs.Content>

                <Tabs.Content className="TabsContent" value="Rascunho">
                    <div>
                        <input placeholder='keyword' onChange={setKeywordQuery}/>
                    </div>
                    <ProductsList products={products}/>
                </Tabs.Content>

                <Tabs.Content className="TabsContent" value="Ativo">
                    <div>
                        <input placeholder='keyword' onChange={setKeywordQuery}/>
                    </div>
                    <ProductsList products={products}/>
                </Tabs.Content>
                    
                <Tabs.Content className="TabsContent" value="Desativado">
                    <div>
                        <input placeholder='keyword' onChange={setKeywordQuery}/>
                    </div>
                    <ProductsList products={products}/>
                </Tabs.Content>

            </Tabs.Root>

        </div>
    );
}
