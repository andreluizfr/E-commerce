import { useQuery } from 'react-query';
import axios from 'libs/axios';
import { z } from "zod";

interface ILoginResponse {
    success: boolean;
    accessToken: string;
    message: string;
    user: Object | null;
}

const formData = z.object({
    email: z.string({required_error: "E-mail não informado."}),
    password: z.string({required_error: "Senha não informada."})
});

type FormData = z.infer<typeof formData>;

export default function Login (formDataInput: FormData) {

    const loginQuery = useQuery('login', async () => {
    
        const parseResponse = formData.safeParse(formDataInput);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const response = await axios.post('/user/login', formDataInput);
    
        const data = response.data as ILoginResponse;
    
        if (data.success){
    
            localStorage.setItem("x-access-token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            
        }
        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return loginQuery;

}
