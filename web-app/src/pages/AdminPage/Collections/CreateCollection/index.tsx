import './styles.css';

import { useState, useEffect } from 'react';

import CreateCollectionQuery from 'queries/CreateCollection';
import GetProductsAdmin from 'queries/GetProductsAdmin';
import refreshToken from 'queries/RefreshToken';

import Collection from 'types/collection';
import Product from 'types/product';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
import { map } from 'zod';
import ProductCard from 'components/ProductCard';

interface Props {
    create: boolean;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateCollection ({create, setCreate}: Props) : JSX.Element {

    const [collectionToBeCreated, setCollectionToBeCreated] = useState <Collection> ({
        title: "",
        description: "",
        products: []
    });
    const [productsToAdd, setProductsToAdd] = useState<Product[]>([]);
    const [productsAdded, setProductsAdded] = useState<string[]>([]);

    const createCollectionQuery = CreateCollectionQuery(collectionToBeCreated);
    const getProductsAdminQuery = GetProductsAdmin('?');
    const dispatch = useDispatch();

    useEffect(()=>{
        if(create){
            const createCollectionContainer = document.getElementsByClassName('CreateCollection')[0];
            createCollectionContainer.setAttribute("visible", "true");
        } else {
            const createCollectionContainer = document.getElementsByClassName('CreateCollection')[0];
            createCollectionContainer.setAttribute("visible", "false");
        }
    }, [create]);

    useEffect(()=>{
        console.log("collectionToBeCreated -", collectionToBeCreated);
    }, [collectionToBeCreated]);

    useEffect(()=>{
        console.log("productsToAdd -", productsToAdd);
    }, [productsToAdd]);

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
            setProductsToAdd(getProductsAdminQuery.data.products);
            
    }, [dispatch, getProductsAdminQuery, getProductsAdminQuery.data]);


    function updateCollectionToBeCreated(event: React.ChangeEvent <HTMLInputElement>){
        const input = event.target;

        setCollectionToBeCreated({
            ...collectionToBeCreated,
            [input.name]: input.value
        });
    }

    function addProductToCollection(product: Product){
        if(product.productId){
            setCollectionToBeCreated({
                ...collectionToBeCreated,
                products: [...collectionToBeCreated.products, product]
            });

            setProductsAdded([...productsAdded, product.productId]);
        }
    }

    function createCollection(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        createCollectionQuery.refetch();
    }

    //controladora de createCollectionQuery
    useEffect(()=>{

        if(createCollectionQuery.data)
            console.log(createCollectionQuery.data?.message);
            
        if(createCollectionQuery.data?.refresh)
            refreshToken().then(response=>{
                if(response.reload) createCollectionQuery.refetch();
                else {
                    dispatch(removeUser());
                    setTimeout(()=>window.location.reload(), 2000);
                }
            });
        else if(createCollectionQuery.data?.login){
            dispatch(removeUser());
            localStorage.removeItem("x-access-token");
            setTimeout(()=>window.location.reload(), 2000);
        }

    }, [createCollectionQuery, createCollectionQuery.data]);

    function hideCreateContainer(){
        setCreate(false);
    }

    return(
        <div className='CreateCollection'>
            <div className='CreateCollectionBG' onClick={hideCreateContainer}></div>

            <form className='CreateCollection-form' onSubmit={createCollection} noValidate>
                <div className='Title'>Criar Coleção</div>

                <div className="FormField">
                    <label htmlFor='title'>Título</label>
                    <input name="title" onChange={updateCollectionToBeCreated}/>
                </div>

                <div className="FormField">
                    <label htmlFor='description'>Descrição</label>
                    <input name="description" onChange={updateCollectionToBeCreated}/>
                </div>

                <div>Produtos para serem adicionados na lista</div>
                <div className="ProductsTable">
                    {
                        collectionToBeCreated.products.map((product, index)=>
                            <ProductCard product={product} key={"collectionToBeCreatedProduct"+index}/>
                        )
                    }
                </div>
                
                <div>Todos os produtos disponíveis para adicionar a coleçãos</div>
                <div className="ProductsTable">
                    {
                        productsToAdd.map((product, index)=>{
                            if(product.productId && !productsAdded.includes(product.productId)) //adicionar condição productStatus = ativo
                                return(
                                    <ProductCard product={product} key={"collectionToBeCreatedProduct"+index} onClick={()=>addProductToCollection(product)}/>
                                )
                            else
                                return <></>
                        })
                    }
                </div>

                <button className="Submit-button">Salvar</button>

            </form>

        </div>
    );
}
