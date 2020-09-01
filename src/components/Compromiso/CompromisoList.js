import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery, gql } from '@apollo/client';
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
import TextField from '@material-ui/core/TextField';
import StackedBar from './StackedBar';

const ACTIVIDAD_STATS = gql`
  query Stats {
    compromisos: compromiso(order_by: { orden: asc }) {
      slug
      titulo
      acciones {
        total: actividades_aggregate {
          aggregate {
            count
          }
        }
        ninguno: actividades_aggregate(
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
        iniciado: actividades_aggregate(
          where: { metadatos: { _contains: { estatus: "iniciado" } } }
        ) {
          aggregate {
            count
          }
        }
        completo: actividades_aggregate(
          where: { metadatos: { _contains: { estatus: "completo" } } }
        ) {
          aggregate {
            count
          }
        }
        verificado: actividades_aggregate(
          where: { metadatos: { _contains: { estatus: "verificado" } } }
        ) {
          aggregate {
            count
          }
        }
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

  const [search, setSearch] = useState('');

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

  const { data: { compromisos } = {} } = useQuery(ACTIVIDAD_STATS);

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
                rel="noopener noreferrer"
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

        <Grid item xs={12}>
          <TextField
            id="standard-full-width"
            label=""
            style={{ margin: 1 }}
            placeholder="Filtra los Comprimisos Puede ser por:
          Dependencia Responsable, Institución de Organización Civil Responsable o
          Miembro del comité coordinador"
            helperText="Control para filtrar y/o ordenar compromisos"
            fullWidth
            margin="normal"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Sortable
            items={plan.compromisos}
            campoFilter="dependencia"
            search={search}
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

        {compromisos && (
          <Grid item xs={12}>
            <StackedBar data={compromisos} horizontal />
            <StackedBar data={compromisos} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CompromisoList;
