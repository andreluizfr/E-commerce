import axios from 'libs/axios';
import { useQuery } from 'react-query';
import User from 'types/user';

interface IGetUserResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    user?: User | null;
}

export default function GetUser () {

    const getUserQuery = useQuery('getUser', async () => {
        
        const accessToken = localStorage.getItem("x-access-token");

        const response = await axios.get('/user/getUser',  {headers: { Authorization: `Bearer ${accessToken}` }});

        const data = response.data as IGetUserResponse;

        console.log(response.data.message);
        
        return data;

    }, {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 5 //5 segundos
    });

    return getUserQuery;

}
