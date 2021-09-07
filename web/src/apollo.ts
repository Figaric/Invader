import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include"
});

const wsLink = process.browser
? new WebSocketLink({
  uri: "ws://localhost:8080/graphql",
  options: {
    reconnect: true
  }
})
: () => {
  console.log('SSR');
};

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink as any,
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default apolloClient;