import React, { useEffect } from 'react';
import _ from 'lodash';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';
import { useKeycloak } from 'react-keycloak';

const useRoles = () => {
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed, idToken } = keycloak;

  const claims = _.mapKeys(
    _.get(tokenParsed, ['https://hasura.io/jwt/claims'], {}),
    (_, key) => key.replace('x-hasura-', '').replace('-', '_')
  );

  const usuario = {
    ...tokenParsed,
    claims,
    institucion: claims.institucion_id,
    organizacion: claims.organizacion_id,
    administrador: _.get(claims, 'allowed_roles', []).includes('administrador'),  
  };

  return {
    login,
    logout: () => { window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY); logout() },
    authenticated,
    usuario,
    loading: !initialized,
  }
};

export {
  useRoles,
}