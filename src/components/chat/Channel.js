import React, { useCallback, useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@apollo/react-hooks'
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from '../../gql/message/index'
import Message from './Message'
import { useStateValue } from '../../context/state'

const Channel = () => {
  const [{channelId, channelName}] = useStateValue()
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, { variables: { channelId: channelId} })
  
  const subscribeToMessages = useCallback(() => subscribeToMore({
    document: MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newMessage = subscriptionData.data.messagePosted
      if (prev.messages.find((message) => message._id === newMessage._id)) return prev
      if (channelId !== newMessage.channelId) return prev
      return produce(prev, (next) => { next.messages.push(newMessage) })
    }
  }));

  useEffect(() => subscribeToMessages()) 

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h1>Channel: {channelName}</h1>
      {data.messages.map(message => (
        <Message key={message._id} messageId={message._id} author={message.author} body={message.body} replies={message.replies}></Message>
      ))}
    </div>
  )
}

export default Channel