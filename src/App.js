import React, { useContext }  from 'react'
import Auth from './components/auth/'
import Chat from './components/chat/'
import { StateProvider } from './context/state'

const App = () => {
  const initialState = {
    authToken: undefined,
    channelId: undefined,
    channelName: undefined,
    threadId: undefined
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'setAuthToken': 
        return {
          ...state,
          authToken: action.authToken
        }
      case 'setChannelId':
        return {
          ...state,
          channelId: action.channelId
        }
      case 'setChannelName':
        return {
          ...state,
          channelName: action.channelName
        }
      case 'setThreadId':
        return {
          ...state,
          threadId: action.threadId
        }
      default: 
        return state
    }
  }

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Auth></Auth>
      <Chat></Chat>
    </StateProvider>
  )
}

export default App;
