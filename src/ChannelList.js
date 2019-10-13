import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import useGlobal from "./store";
import { GET_CHANNELS } from './gql/message/index';

function setChannel(action, channel) {
  action(channel);
}

function ChannelList() {
  const [globalState, globalActions] = useGlobal();
  const { loading, error, data } = useQuery(GET_CHANNELS, { variables: globalState.channel.id});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.channels.map((channel) => (
        <p key={channel.id} onClick={() => setChannel(globalActions.setChannel, channel)}>{channel.name}</p>
      ))}
    </div>
  );
}

export default ChannelList;