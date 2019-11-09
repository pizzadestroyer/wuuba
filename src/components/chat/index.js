import React from 'react'
import Grid from '@material-ui/core/Grid'
import Channel from './Channel'
import MessageInput from './MessageInput'
import ChannelList from './ChannelList'
import CreateChannel from './CreateChannel'
import Thread from './Thread'
import { useStateValue } from '../../context/state'

const Chat = () => {
  const [{threadId}] = useStateValue()
  return (
    <Grid container>
      <Grid item xs={3}>
        <ChannelList></ChannelList>
        <CreateChannel></CreateChannel>
      </Grid>
      <Grid item xs={9}>
        {threadId ? <Thread></Thread> : <Channel></Channel>}
        <MessageInput></MessageInput>
      </Grid>
    </Grid>
  )
}

export default Chat