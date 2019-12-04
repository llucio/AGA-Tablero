import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import DownloadIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import Editable from '../Editable';

import CompromisoCard from './CompromisoCard';

const LIST_QUERY = loader('../../queries/CompromisoList.graphql');

const CompromisoList = ({ where }) => {
  const { data: { plan: [plan] = [] } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        compromisosWhere: where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !plan) return <LoadingIndicator />;
  if (!plan) return null;

  const { compromisos = [], metadatos = {} } = plan;

  return (
    <div className="vertical-margin-bottom">
      <h2>Compromisos</h2>
      <hr className="line" />
      <Editable
        upload
        item={plan}
        label="Descarga de plan de acción"
        path="metadatos.descarga"
        uploadType="file"
        onUpdate={refetch}
      >
        <Fab
          href={metadatos.descarga}
          download
          target="_blank"
          variant="extended"
          color="light"
        >
          <DownloadIcon title="Descarga el plan de acción" />
          Descarga plan de acción
        </Fab>
      </Editable>
      <Sortable
        items={compromisos}
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
