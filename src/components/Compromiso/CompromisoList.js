import React from 'react';
import gql from 'graphql-tag';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
// import FuzzySearch from 'react-fuzzy';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from '../LoadingIndicator';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DownloadIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Sortable from '../Sortable';
import Editable from '../Editable';
import CompromisoCard from './CompromisoCard';

const ACTIVIDAD_STATS = gql`
  query CompromisosStats {
    total: actividad_aggregate {
      aggregate {
        count
      }
    }
    ninguno: actividad_aggregate(
      where: {
        _or: [
          { metadatos: { _contains: { estatus: "ninguno" } } }
          { _not: { metadatos: { _has_key: "estatus" } } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    iniciado: actividad_aggregate(
      where: {
        # hito_id: { _eq: $hitoId }
        metadatos: { _contains: { estatus: "iniciado" } }
      }
    ) {
      aggregate {
        count
      }
    }
    completo: actividad_aggregate(
      where: {
        # hito_id: { _eq: $hitoId }
        metadatos: { _contains: { estatus: "completo" } }
      }
    ) {
      aggregate {
        count
      }
    }
    verificado: actividad_aggregate(
      where: {
        # hito_id: { _eq: $hitoId }
        metadatos: { _contains: { estatus: "verificado" } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AgaTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(250, 250, 250, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
  arrow: {
    color: theme.palette.common.black,
  },
}))(Tooltip);

const LIST_QUERY = loader('../../queries/CompromisoList.graphql');

const CompromisoList = ({ where }) => {
  const classes = useStyles();

  const {
    data: { plan: [plan] = [] } = {},
    loading,
    error,
    refetch,
  } = useQuery(LIST_QUERY, {
    variables: {
      compromisosWhere: where,
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: {
      total: { aggregate: { count: total } = {} } = {},
      ninguno: { aggregate: { count: ninguno } = {} } = {},
      iniciado: { aggregate: { count: iniciado } = {} } = {},
      completo: { aggregate: { count: completo } = {} } = {},
      verificado: { aggregate: { count: verificado } = {} } = {},
    } = {},
    refetch: statsRefetch,
  } = useQuery(ACTIVIDAD_STATS);

  if (error) return <div>Error</div>;
  if (loading && !plan) return <LoadingIndicator />;
  if (!plan) return null;

  return (
    <div className="vertical-margin-bottom">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <h2>Compromisos</h2>
          <hr className="line" />
        </Grid>
        <Grid item xs={12} sm={4} align="right">
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
                aria-label="descargar plan de acción"
                style={{ width: '300px' }}
                className={classes.margin}
              >
                <DownloadIcon />
                Descargar plan de acción
              </Fab>
            </AgaTooltip>
          </Editable>
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
            container: true,
          }}
          axis="xy"
        />
      </Grid>
    </div>
  );
};

export default CompromisoList;
