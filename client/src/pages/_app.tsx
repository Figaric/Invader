import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { ApolloClient } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/react-hooks';

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  link,
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache({ })
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
