import React from 'react';
import './App.css';
import Channel from './Channel';
import MessageInput from './MessageInput';
import ChannelList from './ChannelList';

function App() {
  return (
    <div className="App">
      <ChannelList></ChannelList>
      <Channel></Channel>
      <MessageInput></MessageInput>
    </div>
  );
}

export default App;
