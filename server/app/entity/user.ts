export interface IUser {
    id: string;
    name: string;
    login: string;

    toPlain(): object
}

export class User implements IUser{
    constructor(public readonly id: string, public readonly login: string, public readonly name: string) {}

    static fromJSON(json: any): User {
        return new User(json.id, json.login, json.name)
    }

    toPlain(): object {
        return {
            id: this.id,
            login: this.login,
            name: this.name
        }
    }
}