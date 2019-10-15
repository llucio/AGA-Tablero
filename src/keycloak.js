import React from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const keycloak = new Keycloak('/keycloak.json');

const initConfig = {
  onLoad: 'check-sso'
};

const Provider = ({ children }) => {
  const setToken = ({ token }) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  return (
    <KeycloakProvider
      initConfig={initConfig}
      keycloak={keycloak}
      onTokens={setToken}
    >
      {children}
    </KeycloakProvider>
  );
};

export default Provider;
export { KeycloakProvider, keycloak };
