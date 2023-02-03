import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";

const CH_URL = process.env.CH_API as string;
const IR_URL = process.env.IR_API as string;
const CH_KEY = process.env.CH_KEY as string;
const IR_KEY = process.env.IR_KEY as string;

const create = (url: string, key: string): AxiosInstance => {
    return axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            'X-API-Key': key,
        },
    });
};

let token_cache: string | undefined;
const getMemoizedToken = async (): Promise<any> => {
    if (!token_cache) token_cache = await api.getToken();
    return token_cache;
}
const authorizeWithJWT = async (config: InternalAxiosRequestConfig) => {
    // @ts-ignore
    config.headers = {
        ...config.headers,
        authorization: await getMemoizedToken()
    };
    return config;
};

const retryOnUnauthorizedError = async (error: any) => {
    let config = error.config;
    if (error.response.status === 401) {
        token_cache = await api.getToken();
        config.headers.authorization = await api.getToken();
        return axios.request(config);
    }
    return Promise.reject(error);
}

const passResponse = (response: AxiosResponse) => response;

const rejectOnError = (error: any) => Promise.reject(error)

const irClient = create(IR_URL, IR_KEY);

const chClient = create(CH_URL, CH_KEY);

const chPrivateClient = create(CH_URL, CH_KEY);
chPrivateClient.interceptors.request.use(authorizeWithJWT, rejectOnError);
chPrivateClient.interceptors.response.use(passResponse, retryOnUnauthorizedError);

export const api = {
    ask: async (question: string) => irClient.post('/ask', {question: question}),

    getToken: async () => chClient.post('/auth/generate-token', null).then(r => r.data.token),
    getAnswerContent: async (id: string) => chPrivateClient.get(`/chunks/${id}`),
}

