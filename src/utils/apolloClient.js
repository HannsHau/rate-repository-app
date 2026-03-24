import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: 'http://127.0.0.1:4000/graphql' }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;