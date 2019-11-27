import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';

import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import CompromisoCard from './CompromisoCard';

const LIST_QUERY = loader('../../queries/CompromisoList.graphql');

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
