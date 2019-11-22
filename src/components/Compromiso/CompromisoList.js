import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import LoadingIndicator from '../LoadingIndicator';import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import CompromisoCard from './CompromisoCard';

const LIST_QUERY = gql`
  query CompromisosQuery($where: compromiso_bool_exp) {
    items: compromiso(
      where: $where
      order_by: [{ orden: asc }, { fecha_creacion: asc }]
    ) {
      id
      titulo
      fecha_creacion
      metadatos
    }
  }
`;

const CompromisoList = ({ where }) => {
  const { data: { items } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !items) return <LoadingIndicator />;
  if (!items) return null;

  return (
    <div className="vertical-margin-bottom">
      <h2>Compromisos</h2>
      <hr className="line" />
      <Sortable
        items={items}
        itemComponent={CompromisoCard}
        itemProps={{}}
        containerComponent={Grid}
        containerProps={{
          direction: 'row',
          justify: 'space-between',
          alignItems: 'flex-start',
          container: true
        }}
        refetch={refetch}
        axis="xy"
      />
    </div>
  );
};

export default CompromisoList;
