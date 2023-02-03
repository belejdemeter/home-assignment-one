import {IUser} from "../entity/user";
import jwt, {JwtPayload, VerifyCallback} from 'jsonwebtoken'

const key = process.env.TOKEN_SECRET as string;

export function generateAccessToken(user: IUser) {
    return jwt.sign(user.toPlain(), key);
}

export function verifyAccessToken(token: string, callback: VerifyCallback<JwtPayload | string>) {
    jwt.verify(token, key, callback)
}