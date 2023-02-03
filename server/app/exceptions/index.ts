export class UnauthorizedException extends Error {}

export class NotFoundException extends Error {}

export class ServerException extends Error {}

export class InvalidInputException extends Error {
    params: object;
    constructor(params: object) {
        super('The given data was invalid.');
        this.params = params;
    }
}