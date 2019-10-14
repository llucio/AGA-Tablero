import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

const keycloak = new Keycloak('/keycloak.json');

ReactDOM.render(
  <KeycloakProvider keycloak={keycloak}>
    <App />
  </KeycloakProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
