import React from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const keycloak = new Keycloak('/keycloak.json');

const initConfig = {
  onLoad: 'check-sso'
};

const Provider = ({ children }) => {
  const onEvent = event => {
    console.log('removiendo item', event)
    // alert(event);
    // window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  const removeToken = () => {
    console.log('removiendo item1!!!')
    // alert('aaa');
    // window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  const setToken = ({ token }) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  return (
    <KeycloakProvider
      initConfig={initConfig}
      keycloak={keycloak}
      onTokens={setToken}
      onEvent={onEvent}
    >
      {children}
    </KeycloakProvider>
  );
};

export default Provider;
export { KeycloakProvider, keycloak };
