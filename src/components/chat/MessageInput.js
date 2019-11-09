import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { POST_MESSAGE, POST_REPLY } from '../../gql/message/index'
import { useStateValue } from '../../context/state'

const MessageInput = () =>  {
  const [{channelName, channelId, threadId}] = useStateValue()
  const [postMessage] = useMutation(POST_MESSAGE)
  const [postReply] = useMutation(POST_REPLY)
  const [message, setMessage] = useState('')

  const sendMessage = (e, message, setMessage, postMessage, channelId, messageId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (messageId) {
        postReply({ variables: { messageId: messageId, body: message }})
      } else {
        postMessage({ variables: { channelId: channelId, body: message }});
      }
      setMessage('');
    }
  }

  return (
    <input 
      type="text"
      placeholder={channelName}
      value={message}
      onChange={e => setMessage(e.target.value)}
      onKeyDown={e => sendMessage(e, message, setMessage, postMessage, channelId, threadId)}/>
  )
}

export default MessageInput