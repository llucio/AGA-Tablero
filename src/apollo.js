import ApolloClient from 'apollo-boost';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';
import jwt from 'jsonwebtoken';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

export const apolloClient = new ApolloClient({
  uri,
  request: operation => {
    const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (token) {
      const decoded = jwt.decode(token);
      const expired = Math.floor(Date.now() / 1000) >= decoded.exp;
      if (!expired) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`
          }
        });
      }
    }
  }
});
