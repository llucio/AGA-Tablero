import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import Hidden from '@material-ui/core/Hidden';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const BreadcrumbHito = props => {
  const idItem = props.hitoId;

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idItem
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  //const { metadatos = {} } = item;

  return (
    <Breadcrumb.Item active>
      <span>
        <Hidden smDown>{item.titulo}</Hidden>
        <Hidden mdUp>Acción clave</Hidden>
      </span>
    </Breadcrumb.Item>
  ); //{item.titulo}
};

export default BreadcrumbHito;
