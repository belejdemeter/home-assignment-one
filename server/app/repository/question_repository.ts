import {AxiosResponse} from "axios";
import {api} from "../client";
import {Chunk, IChunk} from "../entity/chunk";
import {Answer} from "../entity/answer";

interface IChunkCollection {
    chunks: IChunk[];
}

export const questionRepository = {
    getChunks: async (question: string): Promise<IChunk[]> => {
        const toEntity = (response: AxiosResponse<IChunkCollection>) => {
            return response.data.chunks.map(e => new Chunk(e));
        }
        return await api.ask(question).then(toEntity);
    },

    getAnswerContent: async (ids: string[]) => {
        const toEntity = (response: AxiosResponse<string>, id: string) => {
            return new Answer({id: id, content: response.data});
        }
        const toRequest = (id: string) => {
            return api.getAnswerContent(id).then(response => toEntity(response, id));
        }
        return await Promise.all(ids.map(toRequest));
    }
}
