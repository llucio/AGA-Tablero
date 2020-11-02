import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { StickyContainer, Sticky } from 'react-sticky';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GetAppIcon from '@material-ui/icons/GetApp';
import Link from '@material-ui/core/Link';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAuth } from '../../hooks';
import Editable from '../Editable';
import Sortable from '../Sortable';
import DataDisplay from '../DataDisplay';
import LoadingIndicator from '../LoadingIndicator';
import AccionList from '../Accion/AccionList.js';
import Conversacion from '../Conversacion/Conversacion';
import CompromisosPieChart from './CompromisosPieChart';
import ResponsableList from './ResponsableList';

const GET_QUERY = loader('../../queries/CompromisoGetBySlug.graphql');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridRoot: {
    flexGrow: 1,
  },
  institucion: {
    padding: theme.spacing(0, 0, 6, 0),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0),
  },
  panel: {
    width: '100%',
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  sticky: {
    marginTop: '100px',
  },
  margin: {
    marginTop: theme.spacing(1),
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

const CompromisoDetail = () => {
  const { compromisoSlug } = useParams();
  const classes = useStyles();
  const { administrador, loading: authLoading } = useAuth();
  const {
    data: { item: [compromiso] = [] } = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_QUERY, {
    variables: {
      id: compromisoSlug,
    },
  });

  if (error) return <div>Error</div>;
  if (authLoading || (loading && !compromiso)) return <LoadingIndicator />;
  if (!compromiso)
    return <h1>No se encuentra la información solicitada. Verifica la URL</h1>;

  return (
    <div className={classes.gridRoot}>
      <StickyContainer>
        <Grid container spacing={3}>
          <Grid className="menuSidebar d-none d-lg-block" item xs={12} md={3}>
            <Sticky bottomOffset={200}>
              {({
                style,
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight,
              }) => (
                <Box
                  fontSize={17}
                  style={style}
                  className={isSticky ? classes.sticky : ''}
                >
                  {isSticky && (
                    <h5>
                      <strong>{compromiso.titulo}</strong>
                    </h5>
                  )}
                  <h6 className="mt-3">
                    <strong>Acciones clave</strong>
                  </h6>
                  <Sortable
                    typename="accion"
                    items={compromiso.acciones}
                    creatable="compromiso_id"
                    parentId={compromiso.id}
                    refetch={refetch}
                    deletable
                    axis="y"
                    itemComponent={({ item: { titulo, id } }) => (
                      <div key={`sidebar-${id}`} className={classes.margin}>
                        <Link href={`#accion-${id}`}>
                          {titulo || 'Sin título'}
                        </Link>
                      </div>
                    )}
                  />
                  <Divider variant="middle" />
                  <Editable
                    item={compromiso}
                    upload
                    uploadType="file"
                    path="metadatos.descarga"
                    label="Descarga de compromiso"
                    onUpdate={refetch}
                  >
                    <AgaTooltip
                      title="Descarga la hoja de ruta"
                      aria-label="descarga"
                      placement="right"
                    >
                      {compromiso.metadatos.descarga && (
                        <Fab
                          variant="extended"
                          size="large"
                          color="primary"
                          className={classes.button}
                          href={compromiso.metadatos.descarga}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GetAppIcon className={classes.extendedIcon} />
                          Hoja de ruta
                        </Fab>
                      )}
                    </AgaTooltip>
                  </Editable>
                </Box>
              )}
            </Sticky>
          </Grid>
          <Grid item xs={12} md={9} className="compromiso-content">
            <Editable
              item={compromiso}
              path="titulo"
              label="Título"
              onUpdate={refetch}
            >
              <h1 className="extra-bold">{compromiso.titulo}</h1>
            </Editable>

            <Editable
              item={compromiso}
              adminOnly
              upload
              uploadType="image"
              label="Imagen"
              path="metadatos.imagen"
              onUpdate={refetch}
            >
              <img
                src={compromiso.metadatos.imagen}
                alt="compromiso"
                height={100}
              />
            </Editable>

            <hr className="line" />

            <Grid container>
              <Grid item xs={12}>
                <Box className={classes.descripcion}>
                  <h4>¿Cuál es el compromiso?</h4>
                  <Editable
                    html
                    item={compromiso}
                    label="Descripción"
                    path="metadatos.descripcion"
                    onUpdate={refetch}
                  >
                    <DataDisplay
                      data={compromiso.metadatos.descripcion || ''}
                    />
                  </Editable>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <h4>Responsables</h4>
                <ResponsableList compromisoId={compromiso.id} />
              </Grid>

              {compromiso && (
                <Grid item xs={12}>
                  <Box>
                    <h4>Progreso del compromiso</h4>
                    <CompromisosPieChart compromisoId={compromiso.id} />
                  </Box>
                </Grid>
              )}
            </Grid>
            <Box className={classes.descripcion}>
              <h4 className="mt-3">Dependencias responsables</h4>
              <Editable
                item={compromiso}
                html
                path="metadatos.dependencia"
                label="Dependencia"
                onUpdate={refetch}
              >
                <DataDisplay data={compromiso.metadatos.dependencia || ''} />
              </Editable>
              <h4 className="mt-3">Organizaciones Corresponsables</h4>
              <Editable
                item={compromiso}
                html
                path="metadatos.corresponsable"
                label="Organización corresponsable"
                onUpdate={refetch}
              >
                <DataDisplay data={compromiso.metadatos.corresponsable || ''} />
              </Editable>
            </Box>
            <Box className="pt-3">
              {console.log(compromiso.metadatos) ||
                compromisoTabs
                  .filter(
                    ({ key }) =>
                      administrador ||
                      `${compromiso.metadatos[key] || ''}`.replace(
                        /\s*<p>\s*<\/p>\s*/g,
                        ''
                      )
                  )
                  .map(({ key, label }, i) => (
                    <Accordion className="elevation-0" key={i}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-content.${key}`}
                        id={`panel-content-${key}`}
                      >
                        <Typography className="panel_heading extra-bold">
                          {label}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="light">
                          <Editable
                            item={compromiso}
                            label={label}
                            path={`metadatos.${key}`}
                            onUpdate={refetch}
                            html
                          >
                            <>
                              <DataDisplay
                                data={compromiso.metadatos[key] || ''}
                              />
                            </>
                          </Editable>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </Box>
            <Box className="pt-3">
              <h2>Discusión y comentarios</h2>
              <hr className="line" />
              <Conversacion item={compromiso} />
            </Box>
            <Box className="pt-4">
              <h2>Acciones clave</h2>
              <hr className="line" />
              <AccionList where={{ compromiso_id: { _eq: compromiso.id } }} />
            </Box>
          </Grid>
        </Grid>
      </StickyContainer>
    </div>
  );
};

const compromisoTabs = [
  {
    key: 'objetivoSexenio',
    label: 'Objetivo al finalizar el sexenio',
    icon: <BookmarksIcon />,
  },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  {
    key: 'solucionPlanteada',
    label: '¿Cómo contribuye a resolver el problema?',
    icon: <WbIncandescentIcon />,
  },
  { key: 'analisisRiesgo', label: 'Supuestos', icon: <ListAltIcon /> },
  {
    key: 'indicadorGlobal',
    label: 'Indicador global',
    icon: <BookmarksIcon />,
  },
  {
    key: 'valores',
    label: 'Valores de Gobierno Abierto',
    icon: <VerifiedUserIcon />,
  },
  {
    key: 'alineacion2030',
    label: (
      <span>
        Objetivos de Desarrollo Sostenible
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.undp.org/content/undp/es/home/sustainable-development-goals.html"
          edge="start"
          size="small"
          title="Consulta la lista de Objetivos de desarrollo Sostenible"
          aria-label="Consulta la lista de Objetivos de desarrollo Sostenible"
          style={{ marginLeft: '10px' }}
        >
          <HelpIcon />
        </IconButton>
      </span>
    ),
    icon: <VerticalSplitIcon />,
  },
  {
    key: 'igualdadGenero',
    label: 'Alineación con perspectiva de igualdad de género',
    icon: <VerticalSplitIcon />,
  },
  {
    key: 'ejePND',
    label: 'Eje del Plan Nacional de Desarrollo',
    icon: <PeopleAltIcon />,
  },
  {
    key: 'otrosActores',
    label: 'Otros actores involucrados',
    icon: <PeopleAltIcon />,
  },
  { key: 'adicional', label: 'Información adicional', icon: <MenuBookIcon /> },
];

export default CompromisoDetail;
