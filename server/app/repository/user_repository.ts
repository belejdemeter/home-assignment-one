import storage from '../storage'
import {IUser, User} from "../entity/user";
import bcrypt from 'bcryptjs';

interface UserModel {
    login: string,
    id: string,
    password: string
}

interface IUserRepository {
    getByLogin(login: string): IUser | null;
    checkUserPassword(login: string, password: string): Promise<boolean> | boolean;
}

export const userRepository: IUserRepository = {
    getByLogin(login: string): IUser | null {
        const user: UserModel | undefined = storage.get<UserModel>(login)
        return user ? User.fromJSON(user) : null;
    },
   checkUserPassword(login: string, password: string): Promise<boolean> | boolean {
       const user: UserModel | undefined = storage.get<UserModel>(login)

       if(!user) return false;

       return bcrypt.compare(password, user.password);
   }
}