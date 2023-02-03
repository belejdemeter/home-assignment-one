import {NextFunction, Request, Response} from "express";
import {execute} from "../../commands";
import {SignInUserCommand} from "../../commands/sign_in_user_command";

export const userController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const query = new SignInUserCommand(
            req.body.login ,
            req.body.password
        );
        try {
            const result = await execute<any>(query);
            res.status(200).send(result);
        } catch (e) {
            next(e);
        }
    }
}

