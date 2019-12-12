import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Hidden from '@material-ui/core/Hidden';

const GET_QUERY = loader('../../queries/CompromisoGet.graphql');

const BreadcrumbItem = props => {
  const idCompromiso = props.compromisoId;

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idCompromiso
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  //const { metadatos = {} } = item;

  return (
    <LinkContainer to={`/compromiso/${item.id}`}>
      <Breadcrumb.Item>
        <span>
          <Hidden smDown>{item.titulo}</Hidden>
          <Hidden mdUp>Compromiso</Hidden>
        </span>
      </Breadcrumb.Item>
    </LinkContainer>
  );
};
export default BreadcrumbItem;
