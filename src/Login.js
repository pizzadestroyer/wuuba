import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from './gql/auth/index';

function Login() {
    const [login] = useMutation(LOGIN);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        const authToken = await login({ variables: { username: username, password: password } });
        localStorage.setItem('AUTH_TOKEN', authToken.data.login.token)
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={e => handleLogin(e)}>Login</button>
        </div>
    )
}

export default Login