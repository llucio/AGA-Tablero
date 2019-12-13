import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
//import Sortable from '../Sortable';

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
    <div>
      {entregables.map(entregable => (
        <Box key={entregable.id}>
          <Link href={entregable.archivos[0]} color="inherit">
            <PictureAsPdfIcon />
          </Link>
          <Link href={entregable.archivos[1]} color="inherit">
            <PictureAsPdfIcon />
          </Link>
        </Box>
      ))}
    </div>
  );
};

export default EntregableList;
