import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import BreadcrumbLine from './BreadcrumbLine';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const GET_QUERY = loader('../../queries/HitoGet.graphql');
//const LIST_QUERY = loader('../../queries/HitoList.graphql');

const BreadcrumbCompromiso = props => {
  const idItem = props.hitoId;

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idItem
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  const { metadatos = {} } = item;

  return <BreadcrumbLine compromisoId={item.compromiso_id} />; //{item.titulo}
};

export default BreadcrumbCompromiso;
