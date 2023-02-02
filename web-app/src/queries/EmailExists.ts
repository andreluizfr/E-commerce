import axios from 'libs/axios';
import { useQuery } from 'react-query';

interface IEmailExistsResponse {
    exists: boolean
}
export default function GetUser (email: string) {

    const emailExistsQuery = useQuery('emailExists', async () => {

            const response = await axios.post('/user/emailExists', {email});

            const data = response.data as IEmailExistsResponse;
        
            return data;
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return emailExistsQuery;

}