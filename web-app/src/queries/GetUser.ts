import axios from 'libs/axios';
import { useQuery } from 'react-query';

interface IGetUserResponse {
    authenticated: boolean
    refresh: boolean
    message: string
    user: object | null
}

interface IrefreshTokenResponse {
	refreshed: boolean
    newAccessToken: string | null
    message: string
}

export default function GetUser () {

    const getUserQuery = useQuery('getUser', async () => {

        const accessToken = localStorage.getItem("x-access-token");

        if(accessToken){
            const response = await axios.get('/user/getUser',  {headers: { Authorization: `Bearer ${accessToken}` }});

            const data = response.data as IGetUserResponse;
            console.log(data.message);

            if (data.authenticated && data.refresh){

                await refreshToken();
                return null;

            } else if (data.authenticated && !data.refresh){

                localStorage.setItem("user", JSON.stringify(data.user));
                return data.user;

            } else {

                localStorage.clear();
                return null;

            }
        }

        console.log("No access token found.");
        return null;

    }, {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3 //3 segundos
    });

    return getUserQuery;

}

async function refreshToken () {

    const response = await axios.get('/user/refreshToken');

    const data = response.data as IrefreshTokenResponse;
    console.log(data.message);

    if(data.refreshed && data.newAccessToken) {
        localStorage.setItem("x-access-token", data.newAccessToken);
        window.location.reload();
    }
    else localStorage.clear();

}