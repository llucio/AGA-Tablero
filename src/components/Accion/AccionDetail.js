import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LoadingIndicator from '../LoadingIndicator';
import DataDisplay from '../DataDisplay';
import Editable from '../Editable';
import CalendarIcon from '../CalendarIcon';
import ActividadTable from '../Actividad/ActividadTable';
import Conversacion from '../Conversacion/Conversacion';
import MultiColorProgressBar from '../MultiColorProgressBar';

const GET_QUERY = loader('../../queries/AccionGet.graphql');

const ACTIVIDAD_STATS = gql`
  query AccionStats($accionId: uuid!) {
    total: actividad_aggregate(where: { accion_id: { _eq: $accionId } }) {
      aggregate {
        count
      }
    }
    ninguno: actividad_aggregate(
      where: {
        accion_id: { _eq: $accionId }
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
        accion_id: { _eq: $accionId }
        metadatos: { _contains: { estatus: "iniciado" } }
      }
    ) {
      aggregate {
        count
      }
    }
    completo: actividad_aggregate(
      where: {
        accion_id: { _eq: $accionId }
        metadatos: { _contains: { estatus: "completo" } }
      }
    ) {
      aggregate {
        count
      }
    }
    verificado: actividad_aggregate(
      where: {
        accion_id: { _eq: $accionId }
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

const AccionDetail = () => {
  const { accionId } = useParams();
  const classes = useStyles();

  const { data: { item: accion } = {}, loading, error, refetch } = useQuery(
    GET_QUERY,
    {
      variables: {
        id: accionId,
      },
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !accion) return <LoadingIndicator />;
  if (!accion) return <h1>No encontrado</h1>;

  return (
    <div className={classes.root}>
      <Box className="compromiso-content">
        <Grid className={classes.header}>
          <AccionHeader accion={accion} refetch={refetch} />
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <h5>
              <strong>Descripción/objetivo de la acción clave</strong>
            </h5>
            <Editable
              html
              item={accion}
              path="metadatos.descripcion"
              label="Descripción"
              onUpdate={refetch}
            >
              <DataDisplay data={accion.metadatos?.descripcion} />
            </Editable>
          </Grid>
          <Grid item xs={12} md={4}>
            <h5>
              <strong>Responsables</strong>
            </h5>
            <Editable
              html
              item={accion}
              path="metadatos.institucionesResponsables"
              label="Instituciones responsables"
              onUpdate={refetch}
            >
              <DataDisplay
                className="d-block"
                data={accion.metadatos?.institucionesResponsables}
              />
            </Editable>
          </Grid>
        </Grid>
        <Box className="pt-3">
          <h3>Discusión y comentarios</h3>
          <hr className="line" />
          <Conversacion item={accion} refetch={refetch} />
        </Box>

        <ActividadTable where={{ accion_id: { _eq: accion.id } }} />
      </Box>
    </div>
  );
};

const AccionHeader = ({ accion, refetch: parentRefetch }) => {
  const {
    data: {
      total: { aggregate: { count: total } = {} } = {},
      ninguno: { aggregate: { count: ninguno } = {} } = {},
      iniciado: { aggregate: { count: iniciado } = {} } = {},
      completo: { aggregate: { count: completo } = {} } = {},
      verificado: { aggregate: { count: verificado } = {} } = {},
    } = {},
    refetch: statsRefetch,
  } = useQuery(ACTIVIDAD_STATS, {
    variables: {
      accionId: accion.id,
    },
  });

  const refetch = () => {
    return Promise.all([parentRefetch(), statsRefetch()]);
  };

  const readings = total && [
    {
      name: `${verificado} ${
        verificado > 1 ? 'actividades verificadas' : 'actividad verificada'
      }`,
      value: Math.floor((verificado / total) * 100),
      color: '#13A758',
    },
    {
      name: `${completo} ${
        completo > 1
          ? 'actividades completas por ferificar'
          : 'actividad completa por verificar'
      }`,
      value: Math.floor((completo / total) * 100),
      color: '#1390C8',
    },
    {
      name: `${iniciado} ${
        iniciado > 1 ? 'actividades iniciadas' : 'actividad iniciada'
      }`,
      value: Math.floor((iniciado / total) * 100),
      color: '#F89D45',
    },
    {
      name: `${ninguno} ${
        ninguno > 1 ? 'actividades' : 'actividad'
      } sin iniciar`,
      value: Math.floor((ninguno / total) * 100),
      color: '#839EA2',
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <Editable item={accion} path="titulo" label="Título" onUpdate={refetch}>
          <h2 className="bold">{accion.titulo}</h2>
        </Editable>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        className="d-flex justify-content-around widget-calendar light-blue-text text-uppercase extra-bold text-center"
      >
        <Editable
          item={accion}
          path="fecha_inicial"
          label="Fecha inicial"
          type="date"
          valueType="timestamptz"
          onUpdate={refetch}
        >
          {!!accion.fecha_inicial && (
            <Box
              style={{
                display: 'inline-block',
              }}
            >
              <CalendarIcon date={accion.fecha_inicial} />
              Inicio
            </Box>
          )}
        </Editable>
        <Editable
          item={accion}
          path="fecha_final"
          label="Fecha final"
          type="date"
          valueType="timestamptz"
          onUpdate={refetch}
          style={{
            display: 'inline-block',
          }}
        >
          {!!accion.fecha_final && (
            <Box>
              <CalendarIcon date={accion.fecha_final} />
              Fin
            </Box>
          )}
        </Editable>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12}>
          <MultiColorProgressBar readings={readings} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccionDetail;
