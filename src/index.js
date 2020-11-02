import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/styles.css';

// Habilitar Sentry si está configurado
const dsn = process.env.REACT_APP_SENTRY_DSN;
dsn && Sentry.init({ dsn });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
