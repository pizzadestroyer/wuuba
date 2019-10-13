import React, { useCallback, useEffect } from 'react';
import produce from 'immer';
import { useQuery } from '@apollo/react-hooks';
import { GET_MESSAGES_IN_CHANNEL, MESSAGES_SUBSCRIPTION } from './gql/message/index';
import useGlobal from "./store";

function Channel() {
  const [globalState, globalActions] = useGlobal();
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES_IN_CHANNEL, { variables: { channelId: globalState.channel.id} });
  
  const subscribeToNew = useCallback(() => subscribeToMore({
    document: MESSAGES_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.messagePosted;
      if (prev.messagesInChannel.find((message) => message.id === newMessage.id)) return prev;
      return produce(prev, (next) => { next.messagesInChannel.push(newMessage) });
    }
  }));

  useEffect(() => subscribeToNew());  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Channel: {globalState.channel.name}</h1>
      {data.messagesInChannel.map(({ author, body, id }) => (
        <p key={id}>{author}: {body}</p>
      ))}
    </div>
  )
}

export default Channel;