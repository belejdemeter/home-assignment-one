import React, {useEffect, useState} from "react";
import Hero from "../components/base/Hero";
import TextField from "../components/base/TextField";
import Card from "../components/base/Card";
import Button from "../components/base/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

function AuthPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const { login, loading, error: authError, authenticated } = useAuth();
    const error = validationError || authError;
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            console.log('nav')
            navigate("/");
        }
    }, [authenticated])

    const handleSubmit = async () => {
        if (username.trim() === '' || password.trim() === '') {
            setValidationError('Please fill the form with the username and password')
        } else {
            setValidationError(null)
            await login(username, password);
        }
    };

    return (
        <Hero>
                <Card>
                    <h1 className="text-2xl font-bold">Login</h1>

                    <TextField
                        label="Login"
                        placeholder="Type login..."
                        value={username}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        placeholder="Type password..."
                        value={password}
                        type='password'
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    {error && <span className='text-error'>{error}</span>}
                    <Button
                        className="mt-2"
                        onClick={handleSubmit}
                        disabled={loading}
                        loading={loading}
                    >Sign In</Button>
                </Card>
        </Hero>
    )
}

export default AuthPage