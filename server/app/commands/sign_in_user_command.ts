import {ICommand} from "./index";
import validator from "validator";
import {InvalidInputException} from "../exceptions";
import {userRepository} from "../repository/user_repository";
import {generateAccessToken} from "../utils/jwt";

/**
 * Sign In user via username + password
 */
export class SignInUserCommand implements ICommand<any> {
    constructor(private readonly login: string, private readonly password: string) {}

    async execute() {
        this.validate();

        const user = await userRepository.getByLogin(this.login)

        if (user == null) {
            throw new InvalidInputException({login: 'user with specified login not found'})
        }

        const checkedPassword = await userRepository.checkUserPassword(this.login, this.password)

        if (!checkedPassword) {
            throw new InvalidInputException({password: 'invalid password'})
        }

        const token = generateAccessToken(user)

        return {
            access_token: token
        }
    }

    validate(): void {
        if (!this.login || validator.isEmpty(this.login)) {
            throw new InvalidInputException({login: 'login is required'})
        }
        if (!this.password || validator.isEmpty(this.password)) {
            throw new InvalidInputException({password: 'password is required'})
        }
    }
}