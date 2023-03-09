import './styles.css';

import CreateCollection from './CreateCollection';
import ProductCard from 'components/ProductCard';

import { useState, useEffect } from 'react';

import GetCollections from 'queries/GetCollections';

import Collection from 'types/collection';



export default function Collections () : JSX.Element {

    const [collections, setCollections] = useState <Collection[]>([]);
    const [create, setCreate] = useState(false);

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
                        <div className="CollectionProducts"> 
                            {
                                collection.products.map(product=>
                                    <ProductCard product={product} key={product.productId}/>
                                )
                            }
                            
                        </div>
                    </div>
                )
            }
            </div>
            <button onClick={showCreateContainer}>Create</button>
            <CreateCollection create={create} setCreate={setCreate}/>
        </div>
    );
}
