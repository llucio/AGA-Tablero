import React from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import { CalendarIcon } from 'react-calendar-icon';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../DataDisplay';
import Editable from '../Editable';
import moment from '../../utils/moment';
import ActividadTable from '../Actividad/ActividadTable';
import Conversacion from '../Conversacion/Conversacion';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3, 0)
  },
  header: {
    marginBottom: '2em'
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const HitoDetail = props => {
  const { hitoId } = useParams();
  const classes = useStyles();

  const { data: { item: hito } = {}, loading, error, refetch } = useQuery(
    GET_QUERY,
    {
      variables: {
        id: hitoId
      }
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !hito) return <LoadingIndicator />;
  if (!hito) return <h1>No encontrado</h1>;

  return (
    <div className={classes.root}>
      <Box className='compromiso-content'>
        <Grid spacing={2} className={classes.header}>
          <HitoHeader hito={hito} refetch={refetch} />
        </Grid>

        <Grid spacing={2}>
          <div>
            <h6>
              <strong>Descripción/objetivo de la acción clave</strong>
            </h6>
          </div>
          <Editable
            html
            item={hito}
            path='metadatos.descripcion'
            label='Descripción'
            onUpdate={refetch}
          >
            <DataDisplay data={hito.metadatos?.descripcion} />
          </Editable>
          <div>
            <h6>
              <strong>Responsables</strong>
            </h6>
          </div>
          <Editable
            html
            item={hito}
            path='metadatos.institucionesResponsables'
            label='Instituciones responsables'
            onUpdate={refetch}
          >
            <DataDisplay
              className='d-block'
              data={hito.metadatos?.institucionesResponsables}
            />
          </Editable>
        </Grid>
        <Box>
          <Conversacion item={hito} refetch={refetch} />
        </Box>
        <ActividadTable where={{ hito_id: { _eq: hito.id } }} />
      </Box>
    </div>
  );
};

const dateOptions = {
  header: { month: 'short' },
  footer: { year: 'numeric' },
  value: { day: '2-digit' },
  locale: 'es-MX'
};

const HitoHeader = ({ hito, refetch }) => {
  const { metadatos } = hito;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {/*<strong>
          Compromiso:{' '}
          <Link to={`/compromiso/${hito.compromiso.id}`}>
            {hito.compromiso.titulo}
          </Link>
        </strong>*/}
        <Editable item={hito} path='titulo' label='Título' onUpdate={refetch}>
          <h2 className='bold'>{hito.titulo}</h2>
        </Editable>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className='d-flex justify-content-around widget-calendar light-blue-text text-uppercase bold text-center'
      >
        <Editable
          item={hito}
          path='fecha_inicial'
          label='Fecha inicial'
          type='date'
          valueType='timestamptz'
          onUpdate={refetch}
        >
          {!!hito.fecha_inicial && (
            <div style={{ display: 'inline-block' }}>
              <p>Inicio</p>
              <CalendarIcon
                style={{ margin: '0 auto' }}
                date={moment(hito.fecha_inicial)
                  .utc()
                  .toDate()}
                options={dateOptions}
                className='elevation-1'
              />
            </div>
          )}
        </Editable>
        <Editable
          item={hito}
          path='fecha_final'
          label='Fecha final'
          type='date'
          valueType='timestamptz'
          onUpdate={refetch}
          style={{ display: 'inline-block' }}
        >
          {!!hito.fecha_final && (
            <div>
              <p>Fin</p>
              <CalendarIcon
                date={moment(hito.fecha_final)
                  .utc()
                  .toDate()}
                options={dateOptions}
                className='elevation-1'
              />
            </div>
          )}
        </Editable>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className='progress mt-2'>
            <div
              className='progress-bar-dark light-green w-0'
              role='progressbar'
              aria-valuenow='10'
              aria-valuemin='0'
              aria-valuemax='100'
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HitoDetail;
