import React, {useState} from 'react'
import AuthService from '../../services/auth'

interface AuthContextValue {
    authenticated: boolean,
    token: string | null,
    loading: boolean,
    login: (login: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    error: string | null
}

export const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue)


interface AuthProviderProps {
    children: React.ReactNode
}

function AuthProvider(props: AuthProviderProps) {
    // check auth state on first load
    const initialToken = AuthService.getAccessToken()
    const initialAuthenticated = AuthService.authenticated()
    const [authenticated, setAuthenticated] = useState<boolean>(initialAuthenticated)
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>(initialToken)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (login: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const tokenData = await AuthService.login({login, password})
            handleSetToken(tokenData.token);
        } catch (e: any) {
            setError(e.toString());
        } finally {
            setLoading(false)
        }
    };

    const handleSetToken = (token: string) => {
        setToken(token);
        setAuthenticated(true);
    };

    const handleLogout = async (): Promise<void> => {
        await AuthService.logout()
        setToken(null)
        setAuthenticated(false)
        setLoading(false)
    };

    const value: AuthContextValue = {
        authenticated,
        loading,
        login: handleLogin,
        logout: handleLogout,
        token,
        error
    }
    return (
        <AuthContext.Provider
            value={value}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider