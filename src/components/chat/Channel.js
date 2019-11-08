import React, { useCallback, useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@apollo/react-hooks'
import { GET_MESSAGES, MESSAGES_SUBSCRIPTION } from '../../gql/message/index'
import useGlobal from "../../store"
import Message from './Message'

const Channel = () => {
  const [globalState] = useGlobal();
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, { variables: { channel_id: globalState.channel._id} })
  
  const subscribeToMessages = useCallback(() => subscribeToMore({
    document: MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newMessage = subscriptionData.data.messagePosted
      if (prev.messages.find((message) => message._id === newMessage._id)) return prev
      if (globalState.channel._id !== newMessage.channel_id) return prev
      return produce(prev, (next) => { next.messages.push(newMessage) })
    }
  }));

  useEffect(() => subscribeToMessages()) 

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  
  return (
    <div>
      <h1>Channel: {globalState.channel.name}</h1>
      {data.messages.map(({_id, author, body, replies }) => 
        <Message key={_id} id={_id} author={author} body={body} replies={replies}></Message>
      )}
    </div>
  )
}

export default Channel