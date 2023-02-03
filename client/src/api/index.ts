import client from "./client";
import {AxiosResponse} from "axios";
import {Answer} from "../models/answer";

type QueryParams = { [key: string]: any }
type BodyParams = { [key: string]: any }

interface AuthResponse extends AxiosResponse {
    access_token: string
}

const api = {
    question: {
        index: (query: QueryParams) => client.get<Answer[]>(`/question`, {params: query}),
    },
    auth: {
        login: (body: BodyParams) => client.post<AuthResponse>(`/login`, body),
    },

}

export default api;
