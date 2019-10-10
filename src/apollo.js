import ApolloClient from 'apollo-boost';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

export const apolloClient = new ApolloClient({
  uri,
  request: operation => {
    operation.setContext({
      headers: {
        // 'X-Hasura-Role': 'anonymous'
        'X-Hasura-Admin-Secret': 'secret'
      }
    });
  }
});
