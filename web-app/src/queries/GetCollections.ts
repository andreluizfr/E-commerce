import { useQuery } from 'react-query';
import axios from 'libs/axios';
import Collection from 'types/collection';

interface IGetCollectionsResponse {
    success: boolean;
    message: string;
    collections: Collection[];
}

export default function GetCollections () {

    const getCollectionsQuery = useQuery('getCollections', async () => {

        const response = await axios.get('/collection');
    
        const data = response.data as IGetCollectionsResponse;

        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: true,
        staleTime: 3000 //3s
    });

    return getCollectionsQuery;

}


