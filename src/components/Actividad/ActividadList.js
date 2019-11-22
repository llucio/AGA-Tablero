import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import Sortable from '../Sortable';
import ActividadCard from './ActividadCard';

const LIST_QUERY = loader('../../queries/ActividadList.graphql');

const ActividadList = ({ where }) => {
  const { data: { items: actividades = [] } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !actividades) return <LoadingIndicator />;
  if (!actividades) return null;

  return (
    <div className="vertical-margin-bottom">
      <h2>Actividades</h2>
      <hr className="line" />
      <Sortable
        items={actividades}
        itemComponent={ActividadCard}
        // itemProps={{}}
        // containerComponent={Grid}
        // containerProps={{
        //   direction: 'row',
        //   justify: 'space-between',
        //   alignItems: 'flex-start',
        //   container: true
        // }}
        refetch={a => console.log(a)}
        axis="y"
      />
    </div>
  );
};

export default ActividadList;


