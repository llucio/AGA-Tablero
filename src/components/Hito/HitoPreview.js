import React from 'react';

import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import ActividadHito from '../Actividad/ActividadHito';

import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Table from 'react-bootstrap/Table';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0),
  },
  containerHito: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const HitoPreview = ({ match }) => {

  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: match.params.id
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  const { metadatos = {} } = item;

  //return (
  //  <Box>
  //    <h1>{item.titulo}</h1>
  //    <hr className="line" />
  //	</Box>
  //);

  return <HitoHeader hito={item} />;
  //return <HitoHeader />;

};


const dateOptions = {
  header: { month: 'short' },
  footer: { year: 'numeric' },
  value: { day: '2-digit' },
  locale: 'es-MX'
};

const dateTheme = {
  calendarIcon: {
    className:'green'
  }
};

const HitoHeader = ({ hito }) => {
  const classes = useStyles();
  const { titulo,descripcion, ...metadatos } = hito.metadatos;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={2} className="widget-calendar light-blue-text text-uppercase bold">
          <ThemeProvider theme={dateTheme}>
            <CalendarIcon
              date={DateTime.fromISO(hito.fecha_inicial).toJSDate()}
              options={dateOptions}
              theme={dateTheme}
              className='elevation-1'
            />
          </ThemeProvider>
        </Grid>
        <Grid item xs={6} md={7}>
			    <h3 className="extra-bold">
			      {descripcion} 
			    </h3>
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
      </Grid>
      <Grid containerHito spacing={2}>
      	<ActividadHito where={{ hito_id: { _eq: hito.id } }} /> 
      </Grid>
    </div>
  );
};



const ActividadesTable = ({ actividades }) => {
  // const { descripcion, ...metadatos } = actividad.metadatos;

  return (
    <Table striped bordered hoFver>
      <thead className="thead-dark text-uppercase">
        <tr>
          <th>#</th>
          <th>Actividad</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        {actividades.map((actividad, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{actividad.titulo}</td>
            <td>
              <div className="progress">
                <div
                  className="progress-bar light-green progress-bar-animated w-50 progress-bar-striped"
                  role="progressbar"
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};


export default HitoPreview;

