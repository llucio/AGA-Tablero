import React from 'react';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DataDisplay from '../DataDisplay';
import Editable from '../Editable';
import CalendarIcon from '../CalendarIcon';
import ActividadTable from '../Actividad/ActividadTable';
import Conversacion from '../Conversacion/Conversacion';

import MultiColorProgressBar from '../MultiColorProgressBar';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const ACTIVIDAD_STATS = gql`
  query HitoStats($hitoId: uuid!) {
    total: actividad_aggregate(where: { hito_id: { _eq: $hitoId } }) {
      aggregate {
        count
      }
    }
    ninguno: actividad_aggregate(
      where: {
        hito_id: { _eq: $hitoId }
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
        hito_id: { _eq: $hitoId }
        metadatos: { _contains: { estatus: "iniciado" } }
      }
    ) {
      aggregate {
        count
      }
    }
    completo: actividad_aggregate(
      where: {
        hito_id: { _eq: $hitoId }
        metadatos: { _contains: { estatus: "completo" } }
      }
    ) {
      aggregate {
        count
      }
    }
    verificado: actividad_aggregate(
      where: {
        hito_id: { _eq: $hitoId }
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
  root: {
    margin: theme.spacing(3, 0),
  },
  header: {
    marginBottom: '2em',
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const HitoDetail = (props) => {
  const { hitoId } = useParams();
  const classes = useStyles();

  const { data: { item: hito } = {}, loading, error, refetch } = useQuery(
    GET_QUERY,
    {
      variables: {
        id: hitoId,
      },
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !hito) return <LoadingIndicator />;
  if (!hito) return <h1>No encontrado</h1>;

  return (
    <div className={classes.root}>
      <Box className="compromiso-content">
        <Grid className={classes.header}>
          <HitoHeader hito={hito} refetch={refetch} />
        </Grid>

        <Grid spacing={1}>
          <h5>
            <strong>Descripción/objetivo de la acción clave</strong>
          </h5>
          <Editable
            html
            item={hito}
            path="metadatos.descripcion"
            label="Descripción"
            onUpdate={refetch}
          >
            <DataDisplay data={hito.metadatos?.descripcion} />
          </Editable>

          <h5>
            <strong>Responsables</strong>
          </h5>

          <Editable
            html
            item={hito}
            path="metadatos.institucionesResponsables"
            label="Instituciones responsables"
            onUpdate={refetch}
          >
            <DataDisplay
              className="d-block"
              data={hito.metadatos?.institucionesResponsables}
            />
          </Editable>
        </Grid>
        <Box className="pt-3">
          <h3>Discusión y comentarios</h3>
          <hr className="line" />
          <Conversacion item={hito} refetch={refetch} />
        </Box>

        <ActividadTable where={{ hito_id: { _eq: hito.id } }} />

        {/* <Box className="grey lighten-4" style={{ height: '500px' }}>
          <Svg width={400} height={400}>
            <Chord
              data={[
                [11975, 5871, 8916, 2868],
                [1951, 10048, 2060, 6171],
                [8010, 16145, 8090, 8045],
                [1013, 990, 940, 6907]
              ]}
              animate
              nodeEnter={d => ({
                ...d,
                sourceStartAngle: d.sourceEndAngle,
                targetStartAngle: d.targetEndAngle
              })}
            >
              {nodes =>
                nodes.map((node, i) => (
                  <Ribbon
                    {...node}
                    fill="black"
                    stroke="black"
                    fillOpacity={0.9}
                    radius={500 * 0.4}
                    transform={{ translate: [200, 200] }}
                  />
                ))
              }
            </Chord>
          </Svg>
        </Box> */}
      </Box>
    </div>
  );
};

const HitoHeader = ({ hito, refetch }) => {
  const { data: stats = {} } = useQuery(ACTIVIDAD_STATS, {
    variables: {
      hitoId: hito.id,
    },
  });

  const {
    total: { aggregate: { count: total } = {} } = {},
    ninguno: { aggregate: { count: ninguno } = {} } = {},
    iniciado: { aggregate: { count: iniciado } = {} } = {},
    completo: { aggregate: { count: completo } = {} } = {},
    verificado: { aggregate: { count: verificado } = {} } = {},
  } = stats;

  const readings = stats && [
    {
      name: 'Sin iniciar',
      value: (ninguno / total) * 100,
      color: '#ddd',
    },
    {
      name: 'Iniciadas',
      value: (iniciado / total) * 100,
      color: '#cacaca',
    },
    {
      name: 'Completadas',
      value: (completo / total) * 100,
      color: '#cacaca',
    },
    {
      name: 'Verificadas',
      value: (verificado / total) * 100,
      color: '#cacaca',
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <Editable item={hito} path="titulo" label="Título" onUpdate={refetch}>
          <h2 className="bold">{hito.titulo}</h2>
        </Editable>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className="d-flex justify-content-around widget-calendar light-blue-text text-uppercase extra-bold text-center"
      >
        <Editable
          item={hito}
          path="fecha_inicial"
          label="Fecha inicial"
          type="date"
          valueType="timestamptz"
          onUpdate={refetch}
        >
          {!!hito.fecha_inicial && (
            <Box style={{ display: 'inline-block' }}>
              <CalendarIcon date={hito.fecha_inicial} />
              Inicio
            </Box>
          )}
        </Editable>
        <Editable
          item={hito}
          path="fecha_final"
          label="Fecha final"
          type="date"
          valueType="timestamptz"
          onUpdate={refetch}
          style={{ display: 'inline-block' }}
        >
          {!!hito.fecha_final && (
            <Box>
              <CalendarIcon date={hito.fecha_final} />
              Fin
            </Box>
          )}
        </Editable>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={8}>
          <MultiColorProgressBar readings={readings} />
          <Box className="progress mt-2">
            <Box
              className="progress-bar-dark light-green w-{"
              role="progressbar"
              aria-valuenow="40"
              aria-valuemin="10"
              aria-valuemax="100"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Editable
            item={hito}
            path="ponderacion"
            label="Ponderación"
            valueType="Float"
            onUpdate={() => {
              refetch();
            }}
          >
            <Box>Ponderación: {hito.ponderacion}%</Box>
            <br className="clearfix" />
          </Editable>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HitoDetail;
