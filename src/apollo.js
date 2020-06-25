import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/link-batch-http';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

const customFetch = (uri, options) => {
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      const expired = Math.floor(Date.now() / 1000) >= decoded.exp;
      if (!expired) {
        const isAdmin = decoded['https://hasura.io/jwt/claims'][
          'x-hasura-allowed-roles'
        ].includes('administrador');
        options.headers['x-hasura-role'] = isAdmin ? 'administrador' : 'user';
        options.headers.Authorization = `Bearer ${token}`;
      }
    }
  }

  return fetch(uri, options);
};

const link = new BatchHttpLink({ uri, batchInterval: 20, fetch: customFetch });
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  link,
  queryDeduplication: true,
});
