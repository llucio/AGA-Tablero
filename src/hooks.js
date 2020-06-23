import _ from 'lodash';
import { createGlobalState } from 'react-hooks-global-state';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { useKeycloak } from '@react-keycloak/web';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';
const USUARIO_QUERY = loader('./queries/UsuarioGet.graphql');

const initialState = { anonymousMode: false };
const { useGlobalState } = createGlobalState(initialState);

const useAuth = () => {
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed } = keycloak;
  const [anonymousMode, setAnonymousMode] = useGlobalState('anonymousMode');
  const { data: { usuario } = {}, loading: userLoading } = useQuery(
    USUARIO_QUERY,
    {
      skip: !tokenParsed?.email,
      variables: {
        id: tokenParsed?.email,
      },
    }
  );

  const profile = {
    ...tokenParsed,
    claims: _.mapKeys(
      _.get(tokenParsed, ['https://hasura.io/jwt/claims'], {}),
      (_, key) => key.replace('x-hasura-', '').replace('-', '_')
    ),
  };

  const administrador = _.get(profile.claims, 'allowed_roles', []).includes(
    'administrador'
  );

  return {
    login,
    logout: () => {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      logout();
    },
    authenticated: !anonymousMode && authenticated,
    profile,
    usuario,
    setAnonymousMode,
    anonymousMode,
    organizacion: usuario?.organizacion,
    administrador: !anonymousMode && administrador,
    isAdministrador: !anonymousMode && administrador,
    loading: !initialized || userLoading,
  };
};

export { useAuth };
