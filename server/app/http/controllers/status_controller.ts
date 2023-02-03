import type { Request, Response } from "express";
import {execute} from "../../commands";
import {GetStatusQuery} from "../../commands/get_status_query";

export const statusController = {
    status: async (req: Request, res: Response) => {
        const result = await execute<any>(new GetStatusQuery());
        res.status(200).send(result);
    }
}