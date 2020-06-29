import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import LoadingIndicator from '../LoadingIndicator';
import BreadcrumbItem from '../Layout/BreadcrumbItem';

const GET_QUERY = loader('../../queries/AccionGet.graphql');
//const LIST_QUERY = loader('../../queries/AccionList.graphql');

const BreadcrumbCompromiso = (props) => {
  const idItem = props.accionId;

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: idItem,
    },
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  return <BreadcrumbItem compromisoId={item.compromiso_id} />; //{item.titulo}
};

export default BreadcrumbCompromiso;
