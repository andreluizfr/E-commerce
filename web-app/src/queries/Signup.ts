import { useQuery } from 'react-query';
import axios from 'libs/axios';
import { z } from "zod";

interface ISignupResponse {
    success: boolean;
    message: string;
}

const cpfRegex = RegExp(/(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{3}\d{3}\d{3}\d{2})/);


const formData = z.object({
    firstName: z.string({required_error: "Primeiro nome não informado."})
        .min(1, {message: "O primeiro nome não deve ser vazio."})
        .max(100, {message: "O primeiro nome deve ter no máximo 100 caracteres."}),
    lastName: z.string({required_error: "Sobrenome não informado."})
        .min(1, {message: "O sobrenome não deve ser vazio."})
        .max(100, {message: "O sobrenome deve ter no máximo 100 caracteres."}),
    email: z.string({required_error: "E-mail não informado."})
        .email({message: "Um e-mail válido deve ser informado."})
        .min(1, {message: "O e-mail deve ter no mínimo 3 caracteres."})
        .max(100, {message: "O e-mail deve ter no máximo 100 caracteres."}),
    birthDate: z.date({required_error: "Data de aniversário não informada.", invalid_type_error: "A data não possui formato válido"})
        .min(new Date("1880-01-01"), { message: "Parabéns! Talvez deva ir se cadastrar no Guinness Book primeiro." })
        .max(new Date(new Date().getUTCFullYear() - 18, new Date().getUTCMonth(), new Date().getUTCDate()), { message: "Você deve ter mais de 18 anos para concluir o cadastro." }),
    cpf: z.string({required_error: "CPF não informado."})
        .regex(cpfRegex),
    password: z.string({required_error: "Senha não informada."})
        .min(8, {message: "A senha deve ter no mínimo 8 caracteres."})
        .max(64, {message: "A senha deve ter no máximo 64 caracteres"})
        .regex(/(?=.*[a-z])/)
        .regex(/(?=.*[A-Z])/)
        .regex(/(?=.*\d)/)
        .regex(/(?=.*[!@#$%&*()])/)
});

type FormData = z.infer<typeof formData>;

export default function Signup (formDataInput: FormData) {

    const signupQuery = useQuery('signup', async () => {
    
        const parseResponse = formData.safeParse(formDataInput);
        if(!parseResponse.success)
            throw new Error(parseResponse.error.issues[0].message);

        const response = await axios.post('/user/signup', formDataInput);
    
        const data = response.data as ISignupResponse;

        return data;
    
    }, {
        refetchOnWindowFocus: false,
        enabled: false
    });

    return signupQuery;

}
