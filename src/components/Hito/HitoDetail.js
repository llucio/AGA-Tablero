import React from 'react';

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

import Editable from '../Editable';
import moment from '../../utils/moment';
import ActividadTable from '../Actividad/ActividadTable';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0)
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
      <Grid container spacing={2}>
        <HitoHeader hito={hito} refetch={refetch} />
      </Grid>

      <Grid container spacing={2}>
        <ActividadTable where={{ hito_id: { _eq: hito.id } }} />
      </Grid>
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
  const { titulo, descripcion, ...metadatos } = hito.metadatos;
  return (
    <div>
      <Grid
        item
        xs={3}
        md={2}
        className="widget-calendar light-blue-text text-uppercase bold"
      >
        <ThemeProvider theme={dateTheme}>
          <CalendarIcon
            date={DateTime.fromISO(hito.fecha_inicial).toJSDate()}
            options={dateOptions}
            theme={dateTheme}
            className="elevation-1"
          />
        </ThemeProvider>
      </Grid>
      <Grid item xs={6} md={7}>
        <h3 className="extra-bold">{descripcion}</h3>
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
        <Box>
          <Editable
            adminOnly
            item={hito}
            path="metadatos.ponderacion"
            valueType="Int"
            onUpdate={refetch}
          >
            <strong>{metadatos.ponderacion}</strong>
          </Editable>
          <Editable
            adminOnly
            item={hito}
            path="fecha_inicial"
            type="date"
            valueType="timestamptz"
            onUpdate={refetch}
          >
            <strong>
              {!!hito.fecha_inicial &&
                moment(hito.fecha_inicial)
                  .utc()
                  .format('D [de] MMMM [de] YYYY')}
            </strong>
          </Editable>
          <Editable
            adminOnly
            item={hito}
            path="fecha_final"
            type="date"
            valueType="timestamptz"
            onUpdate={refetch}
          >
            <strong>
              {!!hito.fecha_final &&
                moment(hito.fecha_final)
                  .utc()
                  .format('D [de] MMMM [de] YYYY')}
            </strong>
          </Editable>
        </Box>
      </Grid>
    </div>
  );
};

export default HitoDetail;
