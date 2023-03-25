import './styles.css';

import { useState, useEffect } from 'react';

import CreateCollectionQuery from 'queries/Collection/admin/CreateCollection';
import GetProductsAdmin from 'queries/Product/admin/GetProductsAdmin';
import refreshToken from 'queries/User/public/RefreshToken';

import Collection from 'types/collection';
import Product from 'types/product';

import { useDispatch } from 'react-redux';
import { removeUser } from 'store/features/userSlice';
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

        if(getProductsAdminQuery.data){
            console.log(getProductsAdminQuery.data?.message);
            const serverResponseEl = document.getElementsByClassName("ServerResponse")[0];
            serverResponseEl?.setAttribute("visible", "true");
            setTimeout(()=>{serverResponseEl?.setAttribute("visible", "false")}, 3000);
        }
            
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
        if(product.id){
            setCollectionToBeCreated({
                ...collectionToBeCreated,
                products: [...collectionToBeCreated.products, product]
            });

            setProductsAdded([...productsAdded, product.id]);
        }
    }

    function removeProductFromCollection(productToBeRemoved: Product){
        if(productToBeRemoved.id){
            //procurando e removendo o produto que esta na coleção que vai ser criada
            const newCollectionProducts = [...collectionToBeCreated.products];
            const index = newCollectionProducts.findIndex(collectionProduct=> collectionProduct.id === productToBeRemoved.id);
            newCollectionProducts.splice(index, 1);

            setCollectionToBeCreated({
                ...collectionToBeCreated,
                products: [...newCollectionProducts]
            });

            //procurando e removendo o produto que esta na lista de ids de produtos adicionados na coleção 
            const newProductsAdded = [...productsAdded];
            const index2 = newProductsAdded.findIndex(productAddedId=> productAddedId === productToBeRemoved.id);
            newProductsAdded.splice(index2, 1);

            setProductsAdded([...newProductsAdded]);
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
        else if(createCollectionQuery.data?.success)
            setTimeout(()=>window.location.reload(), 1000);

    }, [dispatch, createCollectionQuery, createCollectionQuery.data]);

    function hideCreateContainer(){
        setCreate(false);
    }

    return(
        <div className='CreateCollection'>
            <div className='CreateCollectionBG' onClick={hideCreateContainer}></div>

            <form className='CreateCollection-form' onSubmit={createCollection} noValidate>
                <div className='Title'>Criar Coleção</div>

                <div className="FormField">
                    <label htmlFor='title' className='CollectionTitle'>Título</label>
                    <input name="title" onChange={updateCollectionToBeCreated}/>
                </div>

                <div className="FormField">
                    <label htmlFor='description' className='CollectionDescription'>Descrição</label>
                    <input name="description" onChange={updateCollectionToBeCreated}/>
                </div>

                <div className="ProductsContainer-info">Todos os produtos da coleção</div>
                <div className="ProductsContainer">
                    {
                        collectionToBeCreated.products.map((product, index)=>
                            <ProductCard product={product} key={"collectionToBeCreatedProduct"+String(index)} onClick={()=>removeProductFromCollection(product)}/>
                        )
                    }
                    <div className="Empty-message">Não existem produtos aqui</div>
                </div>
                
                <div className="ProductsContainer-info">Todos os produtos disponíveis para adicionar a coleção</div>
                <div className="ProductsContainer">
                    {
                        productsToAdd.map((product, index)=>{
                            if(product.id && !productsAdded.includes(product.id)) //adicionar condição productStatus = ativo
                                return(
                                    <ProductCard product={product} key={"collectionToBeCreatedProduct"+String(index)} onClick={()=>addProductToCollection(product)}/>
                                )
                            else
                                return <></>
                        })
                    }
                    <div className="Empty-message">Não existem produtos aqui</div>
                </div>

                <button className="Submit-button">Salvar</button>

            </form>

        </div>
    );
}
