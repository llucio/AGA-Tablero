import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import LoadingIndicator from '../LoadingIndicator';
import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import HitoCard from './HitoCard';

const LIST_QUERY = loader('../../queries/HitoList.graphql');

const HitoList = ({ where }) => {
  const { data: { items: hitos } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !hitos) return <LoadingIndicator />;
  if (!hitos) return null;

  return (
    <div className="vertical-margin">
      <h2>Acciones clave</h2>
      <hr className="line" />
      <Sortable
        typeName="hito"
        items={hitos}
        itemComponent={HitoCard}
        itemProps={{}}
        containerComponent={Grid}
        containerProps={{
          direction: 'row',
          justify: 'space-between',
          alignItems: 'flex-start',
          container: true
        }}
        refetch={refetch}
        axis="y"
      />
    </div>
  );
};

export default HitoList;
