import './styles.css';

import CreateCollection from './CreateCollection';
import ProductCard from 'components/ProductCard';
import DeleteAlertDialog from './DeleteAlertDialog';

import { useState, useEffect } from 'react';

import GetCollections from 'queries/Collection/public/GetCollections';

import Collection from 'types/collection';



export default function Collections () : JSX.Element {

    const [collections, setCollections] = useState <Collection[]>([]);
    const [create, setCreate] = useState(false);
    const [refreshCollections, setRefreshCollections] = useState(false);

    const getCollectionsQuery = GetCollections();

    //controlador da resposta da query getCollections
    useEffect(()=>{
        if(getCollectionsQuery.data){
            console.log(getCollectionsQuery.data.message);
            if(getCollectionsQuery.data.success)
                setCollections(getCollectionsQuery.data.collections);
        }
    }, [getCollectionsQuery.data, getCollectionsQuery]);

    useEffect(()=>{
        console.log(collections);
    }, [collections]);

    useEffect(()=>{
        if(refreshCollections){
            getCollectionsQuery.refetch();
            setRefreshCollections(false);
        }
    }, [refreshCollections, getCollectionsQuery]);

    function showCreateContainer(){
        setCreate(true);
    }

    return(
        <div className='Collections'>
            <div className="ComponentTitle">Coleções</div>
            <div className="CollectionsContainer">
            {
                collections.map(collection=>
                    <div className="Collection" key={collection.collectionId}>
                        <div className="CollectionTitle">{collection.title}</div>
                        <div className="CollectionDescription">{collection.description}</div>
                        <div className="CollectionProducts"> 
                            {
                                collection.products.map(product=>
                                    <ProductCard product={product} key={product.productId}/>
                                )
                            }
                        </div>
                        <DeleteAlertDialog collectionId={collection.collectionId} setRefreshCollections={setRefreshCollections}/>
                    </div>
                )
            }
            </div>

            <button className="CreateButton" onClick={showCreateContainer}>Nova coleção</button>
            <CreateCollection create={create} setCreate={setCreate}/>
        </div>
    );
}
