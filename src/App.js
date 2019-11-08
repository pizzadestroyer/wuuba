import React, { useState }  from 'react';
import Auth from './components/auth/'
import Chat from './components/chat/'
import { AuthContext } from './context/auth'

const App = () => {
  const [authToken, setAuthToken] = useState();

  const setToken = (data) => {
    localStorage.setItem('AUTH_TOKEN', data)
    setAuthToken(data)
  }
  

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      {authToken ? <Chat></Chat> : <Auth></Auth>}
    </AuthContext.Provider>
  )
}

export default App;
