import { useQuery } from 'react-query';
import axios from 'libs/axios';

interface IVerifyEmailResponse {
    message: string;
    success: boolean;
}

interface IVerifyEmailRequest {
    verificationEmailCode: string;
}

export default function VerifyEmail (verifyEmailData: IVerifyEmailRequest) {

    const verifyEmailQuery = useQuery('verifyEmail', async () => {

        const response = await axios.post('/user/verifyEmail', verifyEmailData);
    
        const data = response.data as IVerifyEmailResponse;
        
        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    return verifyEmailQuery;

}
