import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Container from 'react-bootstrap/Container';
import Box from '@material-ui/core/Box';
import AuthProvider from './keycloak';
import { apolloClient } from './apollo';
import MenuPrincipal from './components/Layout/MenuPrincipal';
import Footer from './components/Layout/Footer';
import CompromisoList from './components/Compromiso/CompromisoList';
import CompromisoDetail from './components/Compromiso/CompromisoDetail';
import HitoDetail from './components/Hito/HitoDetail';
import ScrollToTop from './components/ScrollToTop';
import BreadcrumbBar from './components/BreadcrumbBar';

import 'bootstrap/dist/css/bootstrap.css';

const routes = [
  {
    path: '/',
    content: CompromisoList,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto',
    subheading:
      'En este espacio podrás dar seguimiento y monitorear el avance de los compromisos que México adoptó en su 4° Plan de Acción Nacional 2019-2021 en la Alianza para el Gobierno Abierto.',
    image: '/assets/images/planes_de_accion.jpg',
    headerClass: 'medium'
  },
  {
    path: '/compromiso/:id',
    content: CompromisoDetail,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto!',
    subheading: 'NEW',
    headerClass: 'medium'
  },
  {
    path: ['/accion-clave/:id'],
    content: HitoDetail,
    heading: '¡Conoce los avances de los compromisos de Gobierno Abierto!',
    headerClass: 'medium'
  }
];

const theme = {
  calendarIcon: {
    textColor: 'white',
    primaryColor: '#0da472',
    backgroundColor: '#fafafa'
  }
};

const App = () => (
  <AuthProvider>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>
);

const AppRouter = () => (
  <Router>
    <ScrollToTop />
    {routes.map(
      ({
        path,
        content: Content,
        heading,
        subheading,
        headerClass,
        image = '/assets/images/decorativa2.jpg',
        headerArrow = false,
        exact = true
      }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          component={props => (
            <React.Fragment>
              <MenuPrincipal />

              {!!heading && (
                <Heading
                  heading={heading}
                  subheading={subheading}
                  headerArrow={headerArrow}
                  image={image}
                  className={headerClass}
                />
              )}

              <section id="one" className="vertical-margin-top-middle">
                <Container>
                  <BreadcrumbBar {...props} />
                  <Content {...props} />
                </Container>
              </section>

              <Footer />
            </React.Fragment>
          )}
        />
      )
    )}
  </Router>
);

const Heading = ({ className, image, heading, subheading, headerArrow }) => (
  <section
    id="banner"
    className={className}
    style={{ backgroundImage: `url(${image})` }}
  >
    <Box className="content">
      <header>
        <h2 className="big shadow-text">{heading}</h2>
        {subheading && <h4 className="mt-4 lead shadow-text">{subheading}</h4>}
      </header>
    </Box>
    {headerArrow && (
      <a href="#one" className="goto-next scrolly">
        Siguiente
      </a>
    )}
  </section>
);

export default App;
