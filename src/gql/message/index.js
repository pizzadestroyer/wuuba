import { gql } from 'apollo-boost';

export const GET_CHANNELS = gql`{
  channels {
    id
    name
  }
}
`

export const GET_MESSAGES_IN_CHANNEL = gql`
query MessagesInChannel($channelId: String!) {
  messagesInChannel(channelId: $channelId) {
    id
    author
    body
  }
}
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription messagePosted {
    messagePosted {
      id
      author
      body
    }
  }
`;

export const POST_MESSAGE = gql`
mutation PostMessage($author: String!, $body: String!, $channelId: String!) {
  postMessage(author: $author, body: $body, channelId: $channelId) {
    id
    author
    body
  }
}
`;