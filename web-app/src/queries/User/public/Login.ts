import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface ILoginResponse {
    success: boolean;
    accessToken: string;
    message: string;
}

type FormData = {
    email: string;
    password: string;
}

export default function Login (formDataInput: FormData) {

    const loginQuery = useQuery('login', async () => {

        const response = await axios.post('/user/login', formDataInput);
    
        const data = response.data as ILoginResponse;
    
        if (data.success) {
            localStorage.setItem("x-access-token", data.accessToken);
        }

        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return loginQuery;

}
