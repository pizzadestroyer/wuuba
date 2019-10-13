import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { POST_MESSAGE } from './gql/message/index';
import useGlobal from "./store";

function sendMessage(e, message, setMessage, postMessage, channel) {
  if (e.key === 'Enter') {
    e.preventDefault();
    postMessage({ variables: { author: 'Me', body: message, channelId: channel } });
    setMessage('');
  }
}

function MessageInput() {
  const [postMessage] = useMutation(POST_MESSAGE);
  const [message, setMessage] = useState('');
  const [globalState, globalActions] = useGlobal();

  return (
    <input 
      type="text"
      placeholder={globalState.channel.name}
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={e => sendMessage(e, message, setMessage, postMessage, globalState.channel)}/>
  );
}

export default MessageInput;