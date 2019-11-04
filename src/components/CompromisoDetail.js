import React, { useState } from 'react';
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

import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import EditIcon from '@material-ui/icons/Edit';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinkIcon from '@material-ui/icons/Link';


import { useRoles } from '../hooks';
import DataDisplay from './DataDisplay';
import TabPanel from './TabPanel';
import LoadingIndicator from './LoadingIndicator';

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
    padding: theme.spacing(0, 0, 6, 0),
  },
  institucion: {
    padding: theme.spacing(0, 0, 6, 0),
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0),
  },
  panel: {
    width: '100%',
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const CompromisoDetail = ({ match }) => {
  const { data: { compromiso } = {}, loading, error } = useQuery(
    COMPROMISO_QUERY,
    {
      variables: {
        id: match.params.id,
        full: true
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (loading) return <loadingIndicator />;
  if (error || !compromiso) return <h1>No encontrado</h1>;

  return <Compromiso compromiso={compromiso} />;
};

const compromisoTabs = [
  //{ key: 'descripcion', label: 'Descripción', icon: <InfoIcon /> },
  { key: 'valores', label: 'Valores', icon: <VerifiedUserIcon /> },
  { key: 'adicional', label: 'Información', icon: <MenuBookIcon /> },
  { key: 'antecedentes', label: 'Antecedentes', icon: <BookmarksIcon /> },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  { key: 'alineacion2030', label: 'Alineación 2030', icon: <VerticalSplitIcon /> },
  { key: 'solucionPlanteada', label: 'Solución', icon: <WbIncandescentIcon /> },
  { key: 'analisisRiesgo', label: 'Analisís de Riesgo', icon: <ListAltIcon /> },
  { key: 'otrosActores', label: 'Otros actores', icon: <PeopleAltIcon /> },
];

const Compromiso = ({ compromiso }) => {
  const { usuario } = useRoles();
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (_, newIndex) => setTabIndex(newIndex);
  const handleChangeIndex = index => setTabIndex(index);

  return (
    <Box>
      {usuario.administrador && (
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
      )}
      <h1>{compromiso.titulo}</h1>
      <hr className="line" />

      <Box
        className={classes.descripcion}
        p={3}
        fontWeight="fontWeightLight"
        fontSize={20}
      >
        {compromiso.metadatos.descripcion}
      </Box>

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
            {compromisoTabs.map(({ label, icon, }, i) => (
              <Tab key={i} label={label} icon={icon} {...a11yProps(i)} />  
            ))}
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={handleChangeIndex}
        >
          {compromisoTabs.map(({ key }, i) => (
            <TabPanel key={i} index={i} value={tabIndex} dir={theme.direction}>
              <DataDisplay data={compromiso.metadatos[key]} />
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>

      <Box className={classes.box_panel}>
        {compromiso.hitos.map(hito => (
          <Hito key={hito.id} hito={hito} />
        ))}
      </Box>

    </Box>
  );
};

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

const Hito = ({ hito }) => {
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
            <span className="semi-bold">{descripcion}</span>
          </Typography>
        </ExpansionPanelSummary>
        <ActividadesPanel actividades={hito.actividades} hito={hito.id} />
      </ExpansionPanel>
    </Box>
  );

};


const ActividadesPanel = ({ actividades, hito }) => {
  return (

    <ExpansionPanelDetails>
      <Grid container spacing={3}>
        {actividades.map((actividad, i) => (
          <Grid
            item
            xs={12}
            key={i}
          >
            <Typography
              className="light"
              display="block"
            >
              <Link
                variant="body2"
                href={`/hito/${hito}`} 
              >
                {i + 1} . 
                {actividad.titulo}
                <LinkIcon fontSize="small" />
              </Link>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </ExpansionPanelDetails>

  );
};


export default CompromisoDetail;
