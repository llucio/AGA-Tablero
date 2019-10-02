import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import CompromisoBrowser from './components/CompromisoBrowser';
import CompromisoDetail from './components/CompromisoDetail';
import EncuestaBrowser from './components/EncuestaBrowser';
//import Survey from './components/Survey';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ThemeProvider } from 'styled-components';

const theme = {
  calendarIcon: {
    textColor: 'white', // text color of the header and footer
    primaryColor: '#0da472', // background of the header and footer
    backgroundColor: '#fafafa'
  }
};

const uri = process.env.REACT_APP_API_URL || 'http://localhost:4000/v1/graphql';

const client = new ApolloClient({
  uri,
  request: operation => {
    operation.setContext({
      headers: {
        'X-Hasura-Role': 'anonymous'
      }
    });
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route
            path="/"
            exact
            component={props => (
              <React.Fragment>
                <Header
                  style={{
                    backgroundImage: 'url(/assets/images/planes_de_accion.jpg)'
                  }}
                  nextLink
                >
                  <h2 className="big shadow-text">
                    ¡Conoce los avances de los compromisos de Gobierno Abierto
                  </h2>
                  <h4 className="mt-4 lead shadow-text">
                    En este espacio podrás dar seguimiento y monitorear el avance
                    de los compromisos que México adoptó en su 4° Plan de Acción
                    Nacional 2019-2021 en la Alianza para el Gobierno Abierto.
                  </h4>
                </Header>
                <Content>
                  <Breadcrumbs {...props} />
                  <CompromisoBrowser {...props} />
                </Content>
              </React.Fragment>
            )}
          />
          <Route
            path="/compromiso/:id"
            exact
            component={props => (
              <React.Fragment>
                <Header
                  className="medium"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80)'
                  }}
                >
                  <h2 className="big shadow-text">
                    ¡Conoce los avances de los compromisos de Gobierno Abierto
                  </h2>
                </Header>
                <Content>
                  <Breadcrumbs {...props} />
                  <CompromisoDetail {...props} />
                </Content>
              </React.Fragment>
            )}
          />
          <Route
            path="/formulario"
            exact
            component={props => (
              <React.Fragment>
                <Header
                  className="medium"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80)'
                  }}
                >
                  <h2 className="big shadow-text">
                    Formulario de contacto
                  </h2>
                </Header>
                <Content>
                  <Breadcrumbs {...props} />
                  <EncuestaBrowser {...props} />
                </Content>
              </React.Fragment>
            )}
          />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

function Content({ children, ...props }) {
  return (
    <section id="one" className="wrapper style1 special top" {...props}>
      <Container>{children}</Container>
    </section>
  );
}

// function HeaderSection() {
//   return (
//     <Switch>
//       <Route
//         path="/compromiso"
//         component={() => (
//           <Header
//             className="medium"
//             style={{
//               backgroundImage:
//                 'url(https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80)'
//             }}
//           >
//             <h2 className="big">
//               ¡Conoce los avances de los compromisos de Gobierno Abierto
//             </h2>
//           </Header>
//         )}
//       />
//       <Route
//         path="/"
//         component={() => (
//           <Header
//             style={{
//               backgroundImage: 'url(/assets/images/planes_de_accion.jpg)'
//             }}
//             nextLink
//           >
//             <h2 className="big">
//               ¡Conoce los avances de los compromisos de Gobierno Abierto
//             </h2>
//             <h4 className="mt-4 lead">
//               En este espacio podrás dar seguimiento y monitorear el avance de
//               los compromisos que México adoptó en su 4° Plan de Acción Nacional
//               2019-2021 en la Alianza para el Gobierno Abierto.
//             </h4>
//           </Header>
//         )}
//       />
//     </Switch>
//   );
// }

function Header({ image, children, nextLink, ...props }) {
  return (
    <section id="banner" {...props}>
      <div className="content">
        <header>{children}</header>
      </div>
      {nextLink && (
        <a href="#one" className="goto-next scrolly">
          Siguiente
        </a>
      )}
    </section>
  );
}

function Breadcrumbs({ match, ...props }) {
  console.log(props);
  return (
    <Breadcrumb>
      <LinkContainer to="/">
        <Breadcrumb.Item>4&ordm; Plan de Acción</Breadcrumb.Item>
      </LinkContainer>
      <Switch>
        <Route
          path="/compromiso"
          component={() => <Breadcrumb.Item active>Compromiso</Breadcrumb.Item>}
        />
      </Switch>
    </Breadcrumb>
  );
}

export default App;
