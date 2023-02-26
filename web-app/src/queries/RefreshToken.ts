import axios from 'libs/axios';

interface IrefreshTokenResponse {
	refreshed: boolean;
    success: boolean;
    newAccessToken: string | null;
    message: string;
}

export default async function refreshToken () {

    const response = await axios.get('/user/refreshToken');

    const data = response.data as IrefreshTokenResponse;

    if(data.refreshed && data.newAccessToken){
        localStorage.setItem("x-access-token", data.newAccessToken);
        return {reload: true};
    }
    else {
        localStorage.removeItem("x-access-token");
        return {reload: false};
    }

}