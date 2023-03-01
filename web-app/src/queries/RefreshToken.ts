import axios from 'libs/axios';

interface IrefreshTokenResponse {
    success: boolean;
    accessToken: string | null;
    message: string;
}

export default async function refreshToken () {

    const response = await axios.get('/user/refreshToken');

    const data = response.data as IrefreshTokenResponse;

    if(data.success && data.accessToken){
        localStorage.setItem("x-access-token", data.accessToken);
        return {reload: true};
    }
    else {
        localStorage.removeItem("x-access-token");
        return {reload: false};
    }

}