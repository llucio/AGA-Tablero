import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { useKeycloak } from '@react-keycloak/web';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const USUARIO_QUERY = loader('./queries/UsuarioGet.graphql');

const useAuth = () => {
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed } = keycloak;
  const { data: { usuario } = {}, loading: userLoading } = useQuery(
    USUARIO_QUERY,
    {
      skip: !authenticated,
      variables: {
        id: tokenParsed?.email
      }
    }
  );

  const profile = {
    ...tokenParsed,
    claims: _.mapKeys(
      _.get(tokenParsed, ['https://hasura.io/jwt/claims'], {}),
      (_, key) => key.replace('x-hasura-', '').replace('-', '_')
    )
  };

  return {
    login,
    logout: () => {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      logout();
    },
    administrador: _.get(profile.claims, 'allowed_roles', []).includes(
      'administrador'
    ),
    authenticated,
    profile,
    usuario,
    loading: !initialized || userLoading
  };
};

export { useAuth };
