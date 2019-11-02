import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN, SIGN_UP } from '../../gql/auth'

const Auth = () => {
  const [accountExists, setAccountExists] = useState(true)
  const [login] = useMutation(LOGIN)
  const [signup] = useMutation(SIGN_UP)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    setAccountExists(!accountExists)
  }

  const handleAction = async (e) => {
    e.preventDefault()
    if (accountExists) {
      const authToken = await login({ variables: { username: username, password: password } });
      localStorage.setItem('AUTH_TOKEN', authToken.data.login.token)
    } else {
      const authToken = await signup({ variables: { username: username, password: password } });
      localStorage.setItem('AUTH_TOKEN', authToken.data.signup.token) 
    }
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
      <button onClick={e => handleAction(e)}>{accountExists ? 'Login' : 'Create account'}</button>
      <button onClick={e => handleClick(e)}>{accountExists ? 'Need to create account?' : 'Account already exists? Login here.'}</button>
    </div>
  )
}

export default Auth