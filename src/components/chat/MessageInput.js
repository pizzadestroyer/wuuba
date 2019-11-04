import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { POST_MESSAGE, POST_REPLY } from '../../gql/message/index';
import useGlobal from "../../store";

const MessageInput = () =>  {
  const [postMessage] = useMutation(POST_MESSAGE);
  const [postReply] = useMutation(POST_REPLY);
  const [message, setMessage] = useState('');
  const [globalState] = useGlobal();

  const sendMessage = (e, message, setMessage, postMessage, channel_id, message_id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (globalState.thread._id) {
        postReply({ variables: { message_id: message_id, body: message }})
      } else {
        postMessage({ variables: { channel_id: channel_id, body: message }});
      }
      setMessage('');
    }
  }

  return (
    <input 
      type="text"
      placeholder={globalState.channel.name}
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={e => sendMessage(e, message, setMessage, postMessage, globalState.channel._id, globalState.thread._id)}/>
  );
}

export default MessageInput;