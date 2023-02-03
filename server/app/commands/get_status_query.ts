import {ICommand} from "./index";

/**
 * Do a simple health check.
 */
export class GetStatusQuery implements ICommand<Promise<object>> {
    async execute() {
        return new Promise<object>(resolve => (resolve({status: 'ok'})));
    }
}