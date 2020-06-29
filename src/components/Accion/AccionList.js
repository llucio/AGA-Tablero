import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import LoadingIndicator from '../LoadingIndicator';
import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import AccionCard from './AccionCard';

const LIST_QUERY = loader('../../queries/AccionList.graphql');

const AccionList = ({ where }) => {
  const { data: { items: acciones } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !acciones) return <LoadingIndicator />;
  if (!acciones) return null;

  return (
    <div className="vertical-margin">
      <Sortable
        typeName="accion"
        items={acciones}
        itemComponent={AccionCard}
        containerComponent={Grid}
        containerProps={{
          direction: 'row',
          justify: 'space-between',
          alignItems: 'flex-start',
          container: true,
        }}
        refetch={refetch}
        axis="y"
      />
    </div>
  );
};

export default AccionList;
