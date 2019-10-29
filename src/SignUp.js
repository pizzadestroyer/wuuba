import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGN_UP } from './gql/auth/index'

function SignUp() {
    const [signUp] = useMutation(SIGN_UP);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault()
        const authToken = await signUp({ variables: { username: username, password: password } });
        localStorage.setItem('AUTH_TOKEN', authToken.token)
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
            <button onClick={e => handleSignUp(e)}>Sign Up</button>
        </div>
    )
}

export default SignUp