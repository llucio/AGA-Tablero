import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from '../LoadingIndicator';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DownloadIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import Editable from '../Editable';

import CompromisoCard from './CompromisoCard';

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const AgaTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(250, 250, 250, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13
  },
  arrow: {
    color: theme.palette.common.black
  }
}))(Tooltip);

const LIST_QUERY = loader('../../queries/CompromisoList.graphql');

const CompromisoList = ({ where }) => {
  const classes = useStyles();

  const {
    data: { plan: [plan] = [] } = {},
    loading,
    error,
    refetch
  } = useQuery(LIST_QUERY, {
    variables: {
      compromisosWhere: where
    },
    fetchPolicy: 'cache-and-network'
  });

  if (error) return <div>Error</div>;
  if (loading && !plan) return <LoadingIndicator />;
  if (!plan) return null;

  return (
    <div className="vertical-margin-bottom">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <h2>Compromisos</h2>
          <hr className="line" />
        </Grid>
        <Grid item xs={12} sm={5} align="right">
          <Editable
            upload
            item={plan}
            label="Descarga de plan de acción"
            path="metadatos.descarga"
            uploadType="file"
            onUpdate={refetch}
          >
            <AgaTooltip
              title="Descarga el plan de acción"
              aria-label="descarga"
              placement="left"
            >
              <Fab
                href={plan.metadatos?.descarga}
                download
                target="_blank"
                color="primary"
                aria-label="add"
                variant="extend"
                style={{ width: '300px' }}
                className={classes.margin}
              >
                <DownloadIcon />
                Descarga plan de acción
              </Fab>
            </AgaTooltip>
          </Editable>
        </Grid>
      </Grid>

      <Sortable
        items={plan.compromisos}
        itemComponent={CompromisoCard}
        refetch={refetch}
        typename="compromiso"
        containerComponent={Grid}
        containerProps={{
          direction: 'row',
          justify: 'space-between',
          alignItems: 'flex-start',
          container: true
        }}
        axis="xy"
      />
    </div>
  );
};

export default CompromisoList;
