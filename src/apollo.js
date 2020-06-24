import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/link-batch-http';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';
const link = new BatchHttpLink({ uri, batchInterval: 20 });
const cache = new InMemoryCache();

const customFetch = (uri, options) => {
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (token) {
    const decoded = jwt.decode(token);
    if (!decoded) return console.error('Error decodificando token:', token);

    let role = 'user';
    if (
      decoded['https://hasura.io/jwt/claims'][
        'x-hasura-allowed-roles'
      ].includes('administrador')
    ) {
      role = 'administrador';
    }

    const expired = Math.floor(Date.now() / 1000) >= decoded.exp;

    if (!expired) {
      options.headers.Authorization = `Bearer ${token}`;
      options.headers['x-hasura-role'] = role;
    }
  }

  return fetch(uri, options);
};

export const apolloClient = new ApolloClient({
  cache,
  link,
  queryDeduplication: false,
  fetch: customFetch,
});
