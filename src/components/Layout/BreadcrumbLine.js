import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const GET_QUERY = loader('../../queries/CompromisoGet.graphql');

const BreadcrumbLine = props => {
  const idCompromiso = props.compromisoId;

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idCompromiso
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  const { metadatos = {} } = item;

  return (
    <LinkContainer to={`/compromiso/${item.id}`}>
      <Breadcrumb.Item>{item.titulo}</Breadcrumb.Item>
    </LinkContainer>
  );
};

{
  /* <p>{item.titulo}</p> */
}

export default BreadcrumbLine;
