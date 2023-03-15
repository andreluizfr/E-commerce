import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface IDeleteCollectionResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
}

export default function DeleteCollectionQuery (collectionId: string | undefined) {

    const deleteCollectionQuery = useQuery('deleteCollection', async () => {

        if(collectionId){

            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.put('/collection/admin/deleteCollection',  {collectionId: collectionId}, {headers: { Authorization: `Bearer ${accessToken}` }});
        
            const data = response.data as IDeleteCollectionResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false 
    });

    return deleteCollectionQuery;

}


