import React from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { StickyContainer, Sticky } from 'react-sticky';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Editable from '../Editable';
import Sortable from '../Sortable';
import DataDisplay from '../DataDisplay';
import LoadingIndicator from '../LoadingIndicator';
import HitoList from '../Hito/HitoList.js';
import { useRoles } from '../../hooks';

const GET_QUERY = loader('../../queries/CompromisoGet.graphql');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  root_grid: {
    flexGrow: 1
  },
  institucion: {
    padding: theme.spacing(0, 0, 6, 0)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0)
  },
  panel: {
    width: '100%'
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
    width: '100%'
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  sticky: {
    marginTop: '100px'
  }
}));

const CompromisoDetail = ({ match }) => {
  const classes = useStyles();
  const { usuario: { administrador } = {} } = useRoles();
  const { data: { item } = {}, loading, error, refetch } = useQuery(GET_QUERY, {
    variables: {
      id: match.params.id
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  const { metadatos = {} } = item;

  // const handleChange = (_, newIndex) => setTabIndex(newIndex);
  // const handleChangeIndex = index => setTabIndex(index);

  return (
    <div className={classes.root_grid}>
      <StickyContainer>
        <Grid container spacing={3}>
          <Grid className="menuSidebar" item xs={12} sm={3}>
            <Sticky bottomOffset={200}>
              {({
                style,
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => (
                <Box
                  fontSize={18}
                  style={style}
                  className={isSticky ? classes.sticky : ''}
                >
                  {isSticky && (
                    <h5>
                      <strong>{item.titulo}</strong>
                    </h5>
                  )}
                  <Sortable
                    typename="hito"
                    items={item.hitos}
                    creatable="compromiso_id"
                    parentId={item.id}
                    refetch={refetch}
                    deletable
                    itemComponent={({ item: { titulo, id } }) => (
                      <p key={`sidebar-${id}`}>
                        <Link href={`#hito-${id}`}>
                          {titulo || 'Sin título'}
                        </Link>
                      </p>
                    )}
                    axis="y"
                  />
                </Box>
              )}
            </Sticky>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Editable
              item={item}
              path="titulo"
              label="Título"
              onUpdate={refetch}
            >
              <h1 className="extra-bold">{item.titulo}</h1>
            </Editable>

            <Editable
              item={item}
              adminOnly
              upload
              uploadType="image"
              label="Imagen"
              path="metadatos.imagen"
              onUpdate={refetch}
            >
              <img src={metadatos.imagen} alt="compromiso" height={100} />
            </Editable>

            <Editable
              item={item}
              upload
              uploadType="file"
              path="metadatos.descarga"
              label="Descarga de compromiso"
              onUpdate={refetch}
            >
              <a href={metadatos.descarga}>Descarga compromiso</a>
            </Editable>

            <hr className="line" />

            <Box className={classes.descripcion}>
              <h4>¿Cuál es el compromiso?</h4>
              <Editable
                html
                item={item}
                label="Descripción"
                path="metadatos.descripcion"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.descripcion || ''} />
              </Editable>
            </Box>
            <Box className={classes.descripcion}>
              <h4>Dependencias responsables</h4>
              <Editable
                item={item}
                html
                path="metadatos.dependencia"
                label="Dependencia"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.dependencia || ''} />
              </Editable>
              <Editable
                html
                item={item}
                path="metadatos.dependencia2"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.dependencia2 || ''} />
              </Editable>
              <Editable
                html
                item={item}
                path="metadatos.dependencia3"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.dependencia3 || ''} />
              </Editable>
              <h4 d>Organizaciones Corresponsables</h4>
              <Editable
                item={item}
                html
                path="metadatos.corresponsable"
                label="Organización corresponsable"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.corresponsable || ''} />
              </Editable>
            </Box>
            <div className={classes.panel}>
              {compromisoTabs
                .filter(({ key }) => {
                  return (
                    administrador ||
                    `${_.get(item, ['metadatos', key], '') || ''}`.replace(
                      /\s*<p>\s*<\/p>\s*/g,
                      ''
                    )
                  );
                })
                .map(({ key, label }, i) => (
                  <ExpansionPanel className="elevation-0" key={i}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-content.${key}`}
                      id={`panel-content-${key}`}
                    >
                      <Typography className="panel_heading extra-bold ">
                        {label}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography className="light">
                        <Editable
                          item={item}
                          label={label}
                          path={`metadatos.${key}`}
                          onUpdate={refetch}
                          html
                        >
                          <DataDisplay
                            data={_.get(item, ['metadatos', key], '')}
                          />
                        </Editable>
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
            </div>
            <HitoList where={{ compromiso_id: { _eq: item.id } }} />
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
    icon: <BookmarksIcon />
  },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  {
    key: 'solucionPlanteada',
    label: '¿Cómo contribuye a resolver el problema?',
    icon: <WbIncandescentIcon />
  },
  { key: 'analisisRiesgo', label: 'Supuestos', icon: <ListAltIcon /> },
  { key: 'indicadorGlobal', label: 'Indicador global', icon: <BookmarksIcon /> },
  {
    key: 'valores',
    label: 'Valores de Gobierno Abierto',
    icon: <VerifiedUserIcon />
  },
  {
    key: 'alineacion2030',
    label: (
      <span>
        Objetivos de Desarrollo Sostenible
        <IconButton
          target="_blank"
          href="https://www.undp.org/content/undp/es/home/sustainable-development-goals.html"
          edge="start"
          size="small"
          title="Consulta la lista de Objetivos de desarrollo Sostenible"
          aria-label="Consulta la lista de Objetivos de desarrollo Sostenible"
        >
          <HelpIcon />
        </IconButton>
      </span>
    ),
    icon: <VerticalSplitIcon />
  },
  {
    key: 'igualdadGenero',
    label: 'Alineación con perspectiva de igualdad de género',
    icon: <VerticalSplitIcon />
  },
  {
    key: 'ejePND',
    label: 'Eje del Plan Nacional de Desarrollo',
    icon: <PeopleAltIcon />
  },
  {
    key: 'otrosActores',
    label: 'Otros actores involucrados',
    icon: <PeopleAltIcon />
  },
  { key: 'adicional', label: 'Información adicional', icon: <MenuBookIcon /> }
];

export default CompromisoDetail;
