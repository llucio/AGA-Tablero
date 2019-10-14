import ApolloClient from 'apollo-boost';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

export const apolloClient = new ApolloClient({
  uri,
  request: operation => {
    // const token = localStorage.getItem('token');
    const token = null;
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  }
});
