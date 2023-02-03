import {NextFunction, Request, Response} from "express";
import {UnauthorizedException} from "../../exceptions";
import {verifyAccessToken} from "../../utils/jwt";
import {IUser, User} from "../../entity/user";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser
    }
}

export function auth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization
    const token = header && header.split(' ')[1]
    if (token == null) {
        throw new UnauthorizedException("Token is missing");
    }

    verifyAccessToken(token, (err, decoded) => {
        if (err) {
            throw new UnauthorizedException("Invalid token");
        }

        if (decoded) {
            req.user = User.fromJSON(decoded)
        }
        next()
    })

}