import React, { useCallback, useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@apollo/react-hooks'
import { GET_THREAD, REPLIES_SUBSCRIPTION } from '../../gql/message/index'
import { useStateValue } from '../../context/state'

const Thread = () => {
  const [{threadId}] = useStateValue()
  const { loading, error, data, subscribeToMore } = useQuery(GET_THREAD, { variables: { messageId: threadId} })
  
  const subscribeToNew = useCallback(() => subscribeToMore({
    document: REPLIES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newReply = subscriptionData.data.replyPosted
      if (prev.thread.replies.find((reply) => reply._id === newReply._id)) return prev
      if (threadId !== newReply.messageId) return prev
      return produce(prev, (next) => { next.thread.replies.push(newReply) })
    }
  }));

  useEffect(() => subscribeToNew());  

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
 
  return (
    <div>
      <h1>{data.thread.author}: {data.thread.body}</h1>
      {data.thread.replies.map(({_id, author, body }) => (
        <p key={_id}>{author}: {body}</p>
      ))}
    </div>
  )
}

export default Thread