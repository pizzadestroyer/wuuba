import React from 'react'
import Grid from '@material-ui/core/Grid'

import Channel from './Channel'
import MessageInput from './MessageInput'
import ChannelList from './ChannelList'
import CreateChannel from './CreateChannel'

const Chat = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <ChannelList></ChannelList>
          <CreateChannel></CreateChannel>
        </Grid>
        <Grid item xs={9}>
          <Channel></Channel>
          <MessageInput></MessageInput>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat