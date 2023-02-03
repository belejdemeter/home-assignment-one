import storage from "./storage";
import api from "../../api";

interface Credentials {
    login: string,
    password: string
}

interface TokenData {
    token: string
}

class AuthService {
    private token: string | null = null;

    constructor() {
        this.token = storage.getAccessToken()
    }

    authenticated(): boolean {
        return !!this.token;
    }

    getAccessToken(): string | null {
        return this.token;
    }

    async login(credentials: Credentials): Promise<TokenData> {
        try {
            const response = await api.auth.login(credentials);
            const token = response.data.access_token;
            storage.setAccessToken(token);

            return {
                token
            }
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        await storage.clear();
        this.token = null;
    }


}

export default new AuthService()