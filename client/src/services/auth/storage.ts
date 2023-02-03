const LOCAL_STORAGE_TOKEN = 'access_token';
const LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

export default {

    getAccessToken: () => {
        return localStorage.getItem(LOCAL_STORAGE_TOKEN);
    },

    setAccessToken: (token: string) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    },

    clear: () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
    }
}
