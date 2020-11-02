import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { AUTH_TOKEN_STORAGE_KEY } from './constants';

const keycloak = new Keycloak('/keycloak.json');

const initConfig = {
  onLoad: 'check-sso',
};

const Provider = ({ children }) => {
  const setToken = ({ token }) => {
    !!token && window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  };

  return (
    <ReactKeycloakProvider
      initConfig={initConfig}
      authClient={keycloak}
      onTokens={setToken}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default Provider;
export { ReactKeycloakProvider, keycloak };
