import React, { useEffect } from 'react';
import _ from 'lodash';
import createPersistedState from 'use-persisted-state';
import { useKeycloak } from 'react-keycloak';

const useTokenState = createPersistedState('tokenp');

export const useRoles = () => {
  const [__, setToken] = useTokenState('');
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed, idToken } = keycloak;

  // useEffect(() => {
  //   if (initialized && idToken) {
  //     setToken(idToken); 
  //   }
  // }, [idToken, initialized]);

  const claims = _.mapKeys(
    _.get(tokenParsed, ['https://hasura.io/jwt/claims'], {}),
    (_, key) => key.replace('x-hasura-', '').replace('-', '_')
  );

  return {
    login,
    logout,
    authenticated,
    loading: !initialized,
    usuario: { ...tokenParsed, claims },
    institucion: claims.institucion_id,
    organizacion: claims.organizacion_id,
    administrador: _.get(claims, 'allowed_roles', []).includes('administrador'),
  }
};
