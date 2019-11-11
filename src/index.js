import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { StateProvider } from './context/state'

const initialState = {
  authToken: undefined,
  channelId: undefined,
  channelName: undefined,
  threadId: undefined
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'setAuthToken': 
      localStorage.setItem('AUTH_TOKEN', action.authToken)
      return {
        ...state,
        authToken: action.authToken
      }
    case 'setChannelId':
      return {
        ...state,
        channelId: action.channelId
      }
    case 'setChannelName':
      return {
        ...state,
        channelName: action.channelName
      }
    case 'setThreadId':
      return {
        ...state,
        threadId: action.threadId
      }
    default: 
      return state
  }
}

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('AUTH_TOKEN'),
    },
  },
  onError: ({ graphqlErrors, networkError, operation, forward }) => {
    if (graphqlErrors) {
      for (let err in graphqlErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            localStorage.setItem('AUTH_TOKEN', undefined)
        }
      }
    }
    return forward(operation)
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App className="App"/>
    </StateProvider>
  </ApolloProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
