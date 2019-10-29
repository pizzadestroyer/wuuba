import React from 'react';
import './App.css';
import SignUp from './SignUp'
import Login from './Login'
import Channel from './Channel';
import MessageInput from './MessageInput';
import ChannelList from './ChannelList';

function App() {
  return (
    <div className="App">
      <SignUp></SignUp>
      <Login></Login>
      <ChannelList></ChannelList>
      <Channel></Channel>
      <MessageInput></MessageInput>
    </div>
  );
}

export default App;
