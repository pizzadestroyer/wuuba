import React, { useCallback, useEffect } from 'react'
import produce from 'immer'
import { useQuery } from '@apollo/react-hooks'
import { GET_THREAD, REPLIES_SUBSCRIPTION } from '../../gql/message/index'
import useGlobal from "../../store"

const Thread = () => {
  const [globalState] = useGlobal();
  const { loading, error, data, subscribeToMore } = useQuery(GET_THREAD, { variables: { message_id: globalState.thread._id} })
  
  const subscribeToNew = useCallback(() => subscribeToMore({
    document: REPLIES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newReply = subscriptionData.data.replyPosted
      if (prev.thread.replies.find((reply) => reply._id === newReply._id)) return prev
      if (globalState.thread._id !== newReply.message_id) return prev
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