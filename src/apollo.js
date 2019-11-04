import ApolloClient from 'apollo-boost';
import {
  AUTH_TOKEN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  USER_ROLE_DEFAULT
} from './constants';
import jwt from 'jsonwebtoken';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

export const apolloClient = new ApolloClient({
  uri,
  request: operation => {
    const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!token) return;

    const decoded = jwt.decode(token);
    if (!decoded) return console.error('Error decodificando token:', token);
    const expired = Math.floor(Date.now() / 1000) >= decoded.exp;
    !expired &&
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
          'x-hasura-role':
            window.localStorage.getItem(USER_ROLE_STORAGE_KEY) ||
            USER_ROLE_DEFAULT
        }
      });
  }
});
