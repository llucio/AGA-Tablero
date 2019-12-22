import { useEffect } from 'react';
import _ from 'lodash';
import {
  AUTH_TOKEN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  USER_ROLE_DEFAULT
} from './constants';
import { useKeycloak } from '@react-keycloak/web';

const useAuth = () => {
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed } = keycloak;

  const claims = _.mapKeys(
    _.get(tokenParsed, ['https://hasura.io/jwt/claims'], {}),
    (_, key) => key.replace('x-hasura-', '').replace('-', '_')
  );

  const usuario = {
    ...tokenParsed,
    claims,
    institucion: claims.institucion_id,
    organizacion: claims.organizacion_id,
    administrador: _.get(claims, 'allowed_roles', []).includes('administrador')
  };

  useEffect(() => {
    if (authenticated) {
      const role = usuario.administrador ? 'administrador' : USER_ROLE_DEFAULT;
      window.localStorage.setItem(USER_ROLE_STORAGE_KEY, role);
    }
  }, [authenticated, usuario]);

  return {
    login,
    logout: () => {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      logout();
    },
    authenticated,
    usuario,
    loading: !initialized
  };
};

export { useAuth };
