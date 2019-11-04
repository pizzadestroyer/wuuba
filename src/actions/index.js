export const setChannel = (store, channel) => {
  store.setState({channel: channel})
}

export const setThread = (store, message_id) => {
  store.setState({thread: { _id: message_id }} )
}