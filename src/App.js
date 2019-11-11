import React, { useEffect }  from 'react'
import Auth from './components/auth/'
import Chat from './components/chat/'
import { useStateValue } from './context/state'

const App = () => {
  const [{authToken}, dispatch] = useStateValue()

  useEffect(() => {
    if (!localStorage.getItem('AUTH_TOKEN')) {
      dispatch({
        type: 'setAuthToken',
        authToken: undefined
      })
    }
  })

  return (
    <div>
      {authToken ? <Chat></Chat> : <Auth></Auth>}
    </div>
  )

}

export default App;
