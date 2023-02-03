import {NextFunction, Request, Response} from "express";
import {InvalidInputException, UnauthorizedException} from "../../exceptions";

type ErrorMessage = { status: string; title: string; details: string; meta?: any };
type ErrorBag = ErrorMessage[];

export function exceptionHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    console.log(err);
    const bag = getMessages(err);
    res.status(Number(bag[0].status)).send({errors: bag});
}

function getMessages(e: Error): ErrorBag {
    const bag: ErrorBag = [];
    if (e instanceof UnauthorizedException) {
        bag.push({status: '401', title: 'Unauthorized', details: e.message});
    } else if (e instanceof InvalidInputException) {
        // @ts-ignore
        Object.keys(e.params).forEach(key => bag.push({status: '422', title: e.message, details: e.params[key]}));
    } else {
        bag.push({status: '500', title: 'Internal server error', details: e.message || 'Unknown error'});
    }
    return bag;
}