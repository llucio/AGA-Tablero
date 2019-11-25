import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
//import Sortable from '../Sortable';
//import ActividadCard from './ActividadCard';

const LIST_QUERY = loader('../../queries/EntregableList.graphql');

const EntregableList = ({ where }) => {
  const { data: { items: entregables = [] } = {}, loading, error } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !entregables) return <LoadingIndicator />;
  if (!entregables) return null;

  return (
    <div className="vertical-margin-bottom">
      <h2>PDF</h2>
    </div>
  );
};

export default EntregableList;


