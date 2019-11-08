import React, { useCallback, useEffect, useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { REPLIES_SUBSCRIPTION } from '../../gql/message/index'
import useGlobal from "../../store"

const Message = (props) => {
  const [globalState, globalActions] = useGlobal();
  const [replyCount, setReplyCount] = useState(!props.replies ? 0 : props.replies.length)

  useSubscription(REPLIES_SUBSCRIPTION, {
    onSubscriptionData: (options) => {
      if (options.subscriptionData.data.replyPosted.message_id === props.id) setReplyCount(replyCount + 1)
    }
  })

  return (
    <div onClick={e => globalActions.setThread(props.id)}>
      <p>{props.author}: {props.body}</p>
      <div>{replyCount && replyCount > 0 ? <p>{replyCount} replies</p> : ''}</div>
    </div>
  )
}

export default Message