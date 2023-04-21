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

        try{

            const response = await axios.get('/user/getUser',  {headers: { Authorization: `Bearer ${accessToken}` }});

            return response.data as IGetUserResponse;

        } catch (error: any) {

            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx 
                console.log(error.response.status);
                return error.response.data as IGetUserResponse;
            }
            else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser 
                console.log('O servidor não pode responder a essa requisição.');
            } 
            else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
            }

        }

    }, {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 5 //5 segundos
    });

    return getUserQuery;

}
