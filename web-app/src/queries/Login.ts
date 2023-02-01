import { useQuery } from 'react-query';
import axios from 'libs/axios';
import { z } from "zod";

interface ILoginResponse {
    accessToken: string;
    message: string;
    user: Object | null;
}

const formData = z.object({
    email: z.string({required_error: "E-mail não informado."})
        .email({message: "Um e-mail válido deve ser informado."})
        .min(3, {message: "O e-mail deve ter no mínimo 3 caracteres."})
        .max(100, {message: "O e-mail deve ter no máximo 100 caracteres."}),
    password: z.string({required_error: "Senha não informada."})
        .min(8, {message: "A senha deve ter no mínimo 8 caracteres."})
        .max(64, {message: "A senha deve ter no máximo 64 caracteres"})
});

type FormData = z.infer<typeof formData>;

export default function Login (formDataInput: FormData) {

    const loginQuery = useQuery('login', async () => {
    
        const parseResponse = formData.safeParse(formDataInput);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const response = await axios.post('/user/login', formDataInput);
    
        const data = response.data as ILoginResponse;
    
        if (data.accessToken && data.user){
    
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
