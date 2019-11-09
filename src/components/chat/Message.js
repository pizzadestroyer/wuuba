import React, { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { REPLIES_SUBSCRIPTION } from '../../gql/message/index'
import { useStateValue } from '../../context/state'

const Message = (props) => {
  const [{}, dispatch] = useStateValue()
  const [replyCount, setReplyCount] = useState(!props.replies ? 0 : props.replies.length)

  useSubscription(REPLIES_SUBSCRIPTION, {
    onSubscriptionData: (options) => {
      if (options.subscriptionData.data.replyPosted.messageId === props.messageId) setReplyCount(replyCount + 1)
    }
  })

  return (
    <div onClick={e => {
      dispatch({
        type: 'setThreadId',
        threadId: props.messageId
      })}}>
      <p>{props.author}: {props.body}</p>
      <div>{replyCount && replyCount > 0 ? <p>{replyCount} replies</p> : ''}</div>
    </div>
  )
}

export default Message