import React from 'react';
import Auth from './components/auth/'
import Chat from './components/chat/'

const App = () => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if (!token) {
    return <Auth></Auth>
  } else {
    return <Chat></Chat>
  }
}

export default App;
