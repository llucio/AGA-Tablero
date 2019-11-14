import React, { useState } from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/Link';

import { useRoles } from '../hooks';
import Editable from './Editable';
import DataDisplay from './DataDisplay';
import TabPanel from './TabPanel';
import LoadingIndicator from './LoadingIndicator';

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const COMPROMISO_QUERY = loader('../queries/CompromisoQuery.graphql');

const a11yProps = index => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  root_grid: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(2)
  },
  descripcion: {
    padding: theme.spacing(0, 0, 6, 0)
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
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const CompromisoDetail = ({ match }) => {
  const { usuario } = useRoles();
  const { data: { compromiso } = {}, loading, error, refetch } = useQuery(
    COMPROMISO_QUERY,
    {
      variables: {
        id: match.params.id,
        full: true
      },
      fetchPolicy: 'cache-and-network'
    }
  );
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const theme = useTheme();

  if (loading && !compromiso) return <LoadingIndicator />;
  if (error || !compromiso) return <h1>No encontrado</h1>;

  const handleChange = (_, newIndex) => setTabIndex(newIndex);
  const handleChangeIndex = index => setTabIndex(index);
  const refetchComptomiso = () => refetch();

  return (
    <Box>
      {/* {usuario.administrador && (
        <Fab
          href={`/compromiso/${compromiso.id}/editar`}
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
        >
          <EditIcon className={classes.extendedIcon} />
          Editar
        </Fab>
      )} */}
      <Editable object={compromiso} path="titulo" onUpdate={refetchComptomiso}>
        <h1>{compromiso.titulo}</h1>
      </Editable>
      <hr className="line" />
      <Editable
        object={compromiso}
        path="metadatos.descripcion"
        onUpdate={refetchComptomiso}
      >
        <Box
          className={classes.descripcion}
          p={3}
          fontWeight="fontWeightLight"
          fontSize={20}
        >
          {compromiso.metadatos.descripcion}
        </Box>
      </Editable>
      <Editable
        adminOnly
        object={compromiso}
        path="metadatos.imagen"
        onUpdate={refetchComptomiso}
      >
        {compromiso.metadatos.imagen}
      </Editable>
      <Editable
        object={compromiso}
        path="metadatos.descarga"
        onUpdate={refetchComptomiso}
      >
        {compromiso.metadatos.descarga}
      </Editable>
      <Editable
        object={compromiso}
        path="metadatos.descarga"
        onUpdate={refetchComptomiso}
      >
        {compromiso.metadatos.descarga}
      </Editable>
      <Editable
        object={compromiso}
        path="metadatos.responsables"
        onUpdate={refetchComptomiso}
      >
        {compromiso.metadatos.responsables}
      </Editable>
      <Editable
        adminOnly
        object={compromiso}
        path="metadatos.observaciones"
        onUpdate={refetchComptomiso}
      >
        {compromiso.metadatos.observaciones}
      </Editable>

      <Box className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="Compromiso"
          >
            {compromisoTabs.map(({ label, icon }, i) => (
              <Tab key={i} label={label} icon={icon} {...a11yProps(i)} />
            ))}
          </Tabs>
        </AppBar>

        <SwipeableViews index={tabIndex} onChangeIndex={handleChangeIndex}>
          {compromisoTabs.map(({ key }, i) => (
            <TabPanel key={i} index={i} value={tabIndex} dir={theme.direction}>
              <Editable
                object={compromiso}
                path={`metadatos.${key}`}
                onUpdate={refetchComptomiso}
              >
                <DataDisplay data={_.get(compromiso, ['metadatos', key], '')} />
              </Editable>
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>

      <Box className={classes.box_panel}>
        {compromiso.hitos.map(hito => (
          <Hito key={hito.id} hito={hito} refetch={refetchComptomiso} />
        ))}
      </Box>
    </Box>
  );
};

const compromisoTabs = [
  { key: 'valores', label: 'Valores', icon: <VerifiedUserIcon /> },
  { key: 'adicional', label: 'Información', icon: <MenuBookIcon /> },
  { key: 'antecedentes', label: 'Antecedentes', icon: <BookmarksIcon /> },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  { key: 'alineacion2030', label: 'Agenda 2030', icon: <VerticalSplitIcon /> },
  { key: 'solucionPlanteada', label: 'Solución', icon: <WbIncandescentIcon /> },
  { key: 'analisisRiesgo', label: 'Analisís de Riesgo', icon: <ListAltIcon /> },
  { key: 'otrosActores', label: 'Otros actores', icon: <PeopleAltIcon /> }
];

const dateOptions = {
  header: { month: 'long' },
  footer: { year: 'numeric' },
  value: { day: '2-digit' },
  locale: 'es-MX'
};

const dateTheme = {
  calendarIcon: {
    textColor: 'blue', // text color of the header and footer
    primaryColor: '#ccc', // background of the header and footer
    backgroundColor: '#fafafa'
  }
};

const Hito = ({ hito, refetch }) => {
  const { descripcion } = hito.metadatos;
  const classes = useStyles();

  return (
    <Box className={classes.panel}>
      <ExpansionPanel className="vertical-margin-bottom-middle">
        <ExpansionPanelSummary
          className="grey lighten-4 text-uppercase"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.panel_heading}>
            <Editable
              object={hito}
              path="metadatos.descripcion"
              onUpdate={refetch}
            >
              <span className="semi-bold">{descripcion}</span>
            </Editable>
            <Editable
              adminOnly
              object={hito}
              path="metadatos.ponderacion"
              valueType="Int"
              onUpdate={refetch}
            >
              <strong>{hito.metadatos.ponderacion}</strong>
            </Editable>
            <Editable
              adminOnly
              object={hito}
              path="fecha_inicial"
              type="date"
              valueType="timestamptz"
              onUpdate={refetch}
            >
              <strong>{!!hito.fecha_inicial && moment(hito.fecha_inicial).format('LL')}</strong>
            </Editable>
            <Editable
              adminOnly
              object={hito}
              path="fecha_final"
              type="date"
              valueType="timestamptz"
              onUpdate={refetch}
            >
              <strong>{!!hito.fecha_final && moment(hito.fecha_final).format('LL')}</strong>
            </Editable>
          </Typography>
        </ExpansionPanelSummary>
        <ActividadesPanel hito={hito} refetch={refetch} />
      </ExpansionPanel>
    </Box>
  );
};

const ActividadesPanel = ({ hito, refetch }) => {
  return (
    <ExpansionPanelDetails>
      <Grid container spacing={3}>
        {hito.actividades.map((actividad, i) => (
          <Grid item xs={12} key={i}>
            <Typography className="light" display="block">
              <Editable object={actividad} path="titulo" onUpdate={refetch}>
                <Link variant="body2" href={`/hito/${hito.id}`}>
                  {i + 1}. {actividad.titulo}
                  <LinkIcon fontSize="small" />
                </Link>
              </Editable>
              <Editable
                adminOnly
                object={actividad}
                path="orden"
                valueType="Int"
                onUpdate={refetch}
              />
              <Editable
                adminOnly
                object={actividad}
                path="medio_verificacion"
                valueType="String"
                onUpdate={refetch}
              >
                <strong>{actividad.medio_verificacion}</strong>
              </Editable>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </ExpansionPanelDetails>
  );
};

export default CompromisoDetail;
