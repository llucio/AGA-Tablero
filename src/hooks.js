import React from 'react';
import _ from 'lodash';
import { useKeycloak } from 'react-keycloak';

export const useRoles = () => {
  const [keycloak, initialized] = useKeycloak();
  const { login, logout, authenticated, tokenParsed } = keycloak;
  
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
