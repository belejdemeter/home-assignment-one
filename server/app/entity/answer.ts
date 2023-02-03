import sanitizeHtml from "sanitize-html";

export interface IAnswer {
    id: string;
    content: string;
}

export class Answer implements IAnswer {
    id: string;
    content: string;

    constructor({id, content}: IAnswer) {
        this.id = id;
        this.content = this.sanitize(content);
    }

    protected sanitize(content: any): string {
        return sanitizeHtml(content.toString()
            .replace(/(\r\n|\n|\r)/gm, "")
            .trim(), {})
    }
}