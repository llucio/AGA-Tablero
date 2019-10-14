import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

const keycloak = new Keycloak('/keycloak.json');

export { KeycloakProvider, keycloak };
