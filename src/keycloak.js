import React from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { useTokenState } from './hooks';

const keycloak = new Keycloak('/keycloak.json');

const initConfig = {
  onLoad: 'check-sso'
};

const Provider = ({ children }) => {
  const [_, setToken] = useTokenState('');

  return (
    <KeycloakProvider
      keycloak={keycloak}
      onTokens={({ token }) => setToken(token)}
      onAuthLogout={() => setToken('')}
      initConfig={initConfig}
    >
      {children}
    </KeycloakProvider>
  );
};

export default Provider;
export { KeycloakProvider, keycloak, useTokenState };
