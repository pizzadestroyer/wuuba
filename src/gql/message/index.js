import { gql } from 'apollo-boost'

export const GET_MESSAGES = gql`
  query Messages($channelId: String!) {
    messages(channelId: $channelId) {
      _id
      channelId
      author
      body
      replies {
        _id
        messageId
        author
        body
      }
    }
  }`

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagePosted {
    messagePosted {
      _id
      channelId
      author
      body
      replies {
        _id
        messageId
        author
        body
      }
    }
  }`

export const REPLIES_SUBSCRIPTION = gql`
  subscription ReplyPosted {
    replyPosted {
      _id
      messageId
      author
      body
    }
  }`

export const POST_MESSAGE = gql`
  mutation PostMessage($body: String!, $channelId: String!) {
    postMessage(body: $body, channelId: $channelId) {
      _id
      channelId
      author
      body
      replies {
        _id
        messageId
        author
        body
      }
    }
  }`

export const POST_REPLY = gql`
  mutation PostReply($body: String!, $messageId: String!) {
    postReply(body: $body, messageId: $messageId) {
      _id
      author
      body
    }
  }`

export const GET_THREAD = gql`
  query Thread($messageId: String!) {
    thread(messageId: $messageId) {
      _id
      channelId
      author
      body
      replies {
        _id
        author
        body
      }
    }
  }`