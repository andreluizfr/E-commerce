import { useQuery } from 'react-query';
import axios from 'libs/axios';
import User from 'types/user';

interface IUpdateUserResponse {
    refresh: boolean;
    login?: boolean;
    success: boolean;
    message: string;
    user?: User;
}

export default function UpdateUserQuery (params: {userId: string | undefined, changes: object} | null) {

    const updateUserQuery = useQuery('updateUser', async () => {

        if(params){
            const accessToken = localStorage.getItem("x-access-token");

            const response = await axios.post('/user/updateUser',  params, {headers: { Authorization: `Bearer ${accessToken}` }});
            
            const data = response.data as IUpdateUserResponse;

            return data;
            
        } else return null;

    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return updateUserQuery;

}


