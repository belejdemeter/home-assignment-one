import {NextFunction, Request, Response} from "express";
import {execute} from "../../commands";
import {AskQuestionQuery} from "../../commands/ask_question_query";

export const questionController = {
    ask: async (req: Request, res: Response, next: NextFunction) => {
        const query = new AskQuestionQuery(
            req.query.question as string
        );
        try {
            const result = await execute<any>(query);
            res.status(200).send(result);
        } catch (e) {
            next(e);
        }
    }
}

