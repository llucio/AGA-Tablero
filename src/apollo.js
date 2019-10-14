import ApolloClient from 'apollo-boost';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';
import { useTokenState } from './keycloak';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

export const apolloClient = new ApolloClient({
  uri,
  request: operation => {
    const token = global.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${JSON.parse(token)}`
        }
      });
    }
  }
});
