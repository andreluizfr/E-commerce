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
            console.log(data.message);
        
            if (data.accessToken && data.user){
        
                localStorage.setItem("x-access-token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                return data.user;
        
            } 
            
        }
        
        return null;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return loginQuery;

}
