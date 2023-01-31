import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface ILoginResponse {
    accessToken: string;
    message: string;
    user: Object | null;
}

export default function Login (email: string, password: string) {

    const loginQuery = useQuery('login', async () => {

        if(email && password){
    
            const response = await axios.post('/user/login', {email:email, password:password});
        
            const data = response.data as ILoginResponse;
        
            if (data.accessToken && data.user){
        
                localStorage.setItem("x-access-token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                
            }
            return data;
        }
        
        return {message: "E-mail e/ou senha não identificados"};
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return loginQuery;

}
