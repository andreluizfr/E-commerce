import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Collection from 'types/collection';

interface ICreateCollectionResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    collection?: Collection;
}

export default function CreateCollectionQuery (collection: Collection) {

    const createCollectionQuery = useQuery('createCollection', async () => {

        const accessToken = localStorage.getItem("x-access-token");

        const response = await axios.post('/collection/admin/createCollection',  collection, {headers: { Authorization: `Bearer ${accessToken}` }});
    
        const data = response.data as ICreateCollectionResponse;

        return data;

    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return createCollectionQuery;

}


