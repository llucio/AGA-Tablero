import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';

const GET_QUERY = loader('../../queries/CompromisoGet.graphql');

const CustomHeader = props => {
  const idCompromiso = props.compromisoId;
  const heading = props.heading;
  const subheading = props.subheading;
  const headerArrow = props.headerArrow;
  const imageDefault = '/assets/images/planes_de_accion.jpg';

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idCompromiso
    }
  });

  if (error) return <HeadingDefault />;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <HeadingDefault />;

  const { metadatos = {} } = item;
  const imageUrl = metadatos.imagen ? metadatos.imagen : imageDefault;

  return (
    <section id="banner" className="medium" style={{ backgroundImage: `url(${imageUrl})` }}>
      <Box className="content image-content-- pattern4">
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
};

const HeadingDefault = props => {
  const heading = '¡Conoce los avances de los compromisos de Gobierno Abierto!';
  const subheading = '';
  const image = '/assets/images/planes_de_accion.jpg';

  return (
    <section id="banner" className="medium" style={{ backgroundImage: `url(${image})` }}>
      <Box className="content image-content-- pattern4">
        <header>
          <h2 className="big shadow-text">{heading}</h2>
          {subheading && <h4 className="mt-4 lead shadow-text">{subheading}</h4>}
        </header>
      </Box>
    </section>
  );
};

export default CustomHeader;
