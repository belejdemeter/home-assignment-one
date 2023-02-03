export interface IChunk {
    chunkId: string;
    confidence: number;

    isConfident(): any;
}

export class Chunk implements IChunk {
    chunkId: string;
    confidence: number;

    constructor({chunkId, confidence}: IChunk) {
        this.chunkId = chunkId;
        this.confidence = confidence;
    }

    isConfident() {
        return this.confidence >= 70;
    }
}