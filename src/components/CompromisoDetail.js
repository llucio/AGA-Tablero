import React, { useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from 'react-bootstrap/Table';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import EditIcon from '@material-ui/icons/Edit';
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
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
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
  { key: 'descripcion', label: 'Descripción', icon: <InfoIcon /> },
  { key: 'valores', label: 'Valores', icon: <VerifiedUserIcon /> },
  { key: 'adicional', label: 'Información adicional', icon: <MenuBookIcon /> },
  { key: 'antecedentes', label: 'Antecedentes', icon: <BookmarksIcon /> },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  { key: 'alineacion2030', label: 'Alineación 2030', icon: <VerticalSplitIcon /> }
];

const Compromiso = ({ compromiso }) => {
  const { usuario } = useRoles();
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (_, newIndex) => setTabIndex(newIndex);
  const handleChangeIndex = index => setTabIndex(index);

  return (
    <div>
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
      <div className={classes.root}>
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
      </div>

      {compromiso.hitos.map(hito => (
        <Hito key={hito.id} hito={hito} />
      ))}
    </div>
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
    <div className="vertical-margin">
      <Grid container className={classes.root_grid} spacing={2}>
        <Grid item xs={10}>
          <LinkContainer to={`/hito/${hito.id}`}>
            <h3>{descripcion}</h3>
          </LinkContainer>
        </Grid>
        <Grid item xs={2}>


            <ThemeProvider theme={dateTheme}>
              <CalendarIcon
                date={DateTime.fromISO(hito.fecha_inicial).toJSDate()}
                options={dateOptions}
                theme={dateTheme}
              />
            </ThemeProvider>


        </Grid>

        <ActividadesTable actividades={hito.actividades} />
      </Grid>
    </div>
  );
};

const ActividadesTable = ({ actividades }) => {
  // const { descripcion, ...metadatos } = actividad.metadatos;

  return (
    <Table striped bordered hover>
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

export default CompromisoDetail;
