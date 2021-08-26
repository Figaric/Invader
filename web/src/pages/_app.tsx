import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, ApolloProvider, concat, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';

const httpLink = new HttpLink({
  credentials: "include",
  uri: "http://localhost:8080/graphql"
});

const wsLink = process.browser ? new WebSocketLink({
  uri: "ws://localhost:8080/graphql",
  options: {
    reconnect: true
  }
}) : null;

const actualLink = wsLink ? concat(wsLink, httpLink) : httpLink;

const apolloClient = new ApolloClient({
  link: actualLink,
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
