import { gql } from 'apollo-boost'

export const GET_MESSAGES = gql`
query Messages($channel_id: String!) {
  messages(channel_id: $channel_id) {
    _id
    channel_id
    author
    body
  }
}
`

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagePosted {
    messagePosted {
      _id
      channel_id
      author
      body
    }
  }
`

export const POST_MESSAGE = gql`
mutation PostMessage($body: String!, $channel_id: String!) {
  postMessage(body: $body, channel_id: $channel_id) {
    _id
    channel_id
    body
  }
}
`