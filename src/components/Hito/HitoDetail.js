import React from 'react';
import { Link } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Table from 'react-bootstrap/Table';

import DataDisplay from '../DataDisplay';
import Editable from '../Editable';
import moment from '../../utils/moment';
import ActividadTable from '../Actividad/ActividadTable';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0)
  },
  header: {
    marginBottom: '2em'
  },
  containerHito: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const HitoDetail = ({ match, id }) => {
  const classes = useStyles();

  const { data: { item: hito } = {}, loading, error, refetch } = useQuery(
    GET_QUERY,
    {
      variables: {
        id: id || match.params.id
      }
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !hito) return <LoadingIndicator />;
  if (!hito) return <h1>No encontrado</h1>;

  const { metadatos = {} } = hito;

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.header}>
        <HitoHeader hito={hito} refetch={refetch} />
      </Grid>

      <Grid container spacing={2}>
        <Editable
          html
          item={hito}
          path="metadatos.descripcion"
          onUpdate={refetch}
        >
          <DataDisplay data={metadatos.descripcion} />
        </Editable>
      </Grid>
      <ActividadTable where={{ hito_id: { _eq: hito.id } }} />
    </div>
  );
};

const dateOptions = {
  header: { month: 'short' },
  footer: { year: 'numeric' },
  value: { day: '2-digit' },
  locale: 'es-MX'
};

const dateTheme = {
  calendarIcon: {
    className: 'green'
  }
};

const HitoHeader = ({ hito, refetch }) => {
  const { metadatos } = hito;
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={3}
        md={2}
        className="widget-calendar light-blue-text text-uppercase bold"
      >
        <Editable
          item={hito}
          path="fecha_inicial"
          type="date"
          valueType="timestamptz"
          onUpdate={refetch}
        >
          {!!hito.fecha_inicial && (
            <ThemeProvider theme={dateTheme}>
              <CalendarIcon
                date={moment(hito.fecha_inicial)
                  .utc()
                  .toDate()}
                options={dateOptions}
                theme={dateTheme}
                className="elevation-1"
              />
            </ThemeProvider>
          )}
        </Editable>
      </Grid>
      <Grid item xs={6} md={7}>
        <strong>
          <em>
            Compromiso:{' '}
            <Link to={`/compromiso/${hito.compromiso.id}`}>
              {hito.compromiso.titulo}
            </Link>
          </em>
        </strong>
        <Editable item={hito} path="titulo" onUpdate={refetch}>
          <h3 className="extra-bold">{hito.titulo}</h3>
        </Editable>
      </Grid>
      <Grid item xs={3} md={3}>
        <div className="progress">
          <div
            className="progress-bar light-green progress-bar-animated w-50 progress-bar-striped"
            role="progressbar"
            aria-valuenow="10"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </Grid>
      <Grid>
        <Box />
      </Grid>
    </Grid>
  );
};

export default HitoDetail;