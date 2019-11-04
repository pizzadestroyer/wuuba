import { gql } from 'apollo-boost'

export const GET_MESSAGES = gql`
  query Messages($channel_id: String!) {
    messages(channel_id: $channel_id) {
      _id
      channel_id
      author
      body
    }
  }`

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MessagePosted {
    messagePosted {
      _id
      channel_id
      author
      body
    }
  }`

export const REPLIES_SUBSCRIPTION = gql`
  subscription ReplyPosted {
    replyPosted {
      _id
      message_id
      author
      body
    }
  }`

export const POST_MESSAGE = gql`
  mutation PostMessage($body: String!, $channel_id: String!) {
    postMessage(body: $body, channel_id: $channel_id) {
      _id
      channel_id
      author
      body
    }
  }`

export const POST_REPLY = gql`
  mutation PostReply($body: String!, $message_id: String!) {
    postReply(body: $body, message_id: $message_id) {
      _id
      author
      body
    }
  }`

export const GET_THREAD = gql`
  query Thread($message_id: String!) {
    thread(message_id: $message_id) {
      _id
      channel_id
      author
      body
      replies {
        _id
        author
        body
      }
    }
  }`