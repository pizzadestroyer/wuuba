import React, { useCallback, useEffect } from 'react';
import produce from 'immer';
import { useQuery } from '@apollo/react-hooks';
import useGlobal from "../../store";
import { GET_CHANNELS , CHANNELS_SUBSCRIPTION} from '../../gql/channel/index';

function ChannelList() {
  const [globalState, globalActions] = useGlobal();
  const { loading, error, data, subscribeToMore } = useQuery(GET_CHANNELS, { variables: globalState.channel._id})

  const subscribeToNew = useCallback(() => subscribeToMore({
    document: CHANNELS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newChannel = subscriptionData.data.channelCreated;
      if (prev.channels.find((channel) => channel._id === newChannel._id)) return prev
      return produce(prev, (next) => { next.channels.push(newChannel) })
    }
  }))

  useEffect(() => subscribeToNew()) 

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      {data.channels.map((channel) => (
        <p key={channel._id} onClick={() => {
          globalActions.setChannel(channel)
          globalActions.setThread(undefined)
        }}>
        {channel.name}</p>
      ))}
    </div>
  )
}

export default ChannelList