import { gql } from 'apollo-boost'

export const GET_CHANNELS = gql`{
  channels {
    _id
    name
  }
}`

export const CHANNELS_SUBSCRIPTION = gql`
subscription ChannelCreated {
  channelCreated {
    _id
    name
  }
}`

export const CREATE_CHANNEL = gql`
mutation CreateChannel($name: String!) {
  createChannel(name: $name) {
    _id
    name
  }
}`