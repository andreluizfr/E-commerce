import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface IUpdateAddressesResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    addresses?: object[];
}

export default function UpdateAddressesQuery (params: {userId: string | undefined, addresses: object} | null) {

    const updateAddressesQuery = useQuery('updateAddresses', async () => {

        if(params){
            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.post('/user/updateAddresses',  params, {headers: { Authorization: `Bearer ${accessToken}` }});
            
            const data = response.data as IUpdateAddressesResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return updateAddressesQuery;

}


