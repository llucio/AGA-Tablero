import React from 'react';
import { gql } from 'apollo-boost';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useRoles } from '../hooks';
import DataDisplay from './DataDisplay';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const COMPROMISO_QUERY = loader('../queries/CompromisoQuery.graphql');



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className="blue-grey darken-4 text-white"
      {...other}
    >
      <Box p={3} fontWeight="fontWeightLight" fontSize={20}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

  if (loading) return <div>Cargando...</div>;
  if (error || !compromiso) return <h1>No encontrado</h1>;

  return (
    <div>
      <Compromiso compromiso={compromiso} />
    </div>
  );
};


const Compromiso = ({ compromiso }) => {
  const { usuario } = useRoles();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div>
      {usuario.administrador && (
        <LinkContainer to={`/compromiso/${compromiso.id}/editar`}>
          <Button>Editar</Button>
        </LinkContainer>
      )}
      <h1>{compromiso.titulo}</h1>
      <hr className="line" />

      <div className={classes.root}>
        <AppBar position="static" color="default" >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="Compromiso"
          >
            <Tab label="Descripción" icon={<InfoIcon />} {...a11yProps(0)} />
            <Tab label="Valores" icon={<VerifiedUserIcon />} {...a11yProps(1)} />
            <Tab label="Información adicional" icon={<MenuBookIcon />} {...a11yProps(2)} />
            <Tab label="Antecedentes" icon={<BookmarksIcon />} {...a11yProps(3)} />
            <Tab label="Problemática" icon={<AssignmentLateIcon />} {...a11yProps(4)} />
            <Tab label="Alineación 2030" icon={<VerticalSplitIcon />} {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {compromiso.metadatos.descripcion}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {compromiso.metadatos.valores}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {compromiso.metadatos.adicional}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {compromiso.metadatos.antecedentes}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {compromiso.metadatos.problematica}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {compromiso.metadatos.alineacion2030}
        </TabPanel>
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
  const { descripcion, ...metadatos } = hito.metadatos;
  return (
    <div>
      <div className="mt-5">
        <div>
          <div>
            <LinkContainer to={`/hito/${hito.id}`}>
              <h2>{descripcion}</h2>
            </LinkContainer>
          </div>
          <div xs="2">
            <ThemeProvider theme={dateTheme}>
              <CalendarIcon
                date={DateTime.fromISO(hito.fecha_inicial).toJSDate()}
                options={dateOptions}
                theme={dateTheme}
              />
            </ThemeProvider>
          </div>
        </div>
        <DataDisplay
          data={metadatos}
          labelComponent="h3"
          keys={{
            descripcion: 'Descripción',
            valores: 'Valores',
            adicional: 'Información adicional',
            antecedentes: 'Antecedentes',
            problematica: 'Problemática',
            alineacion2030: 'Alineación 2030'
          }}
        />
        <ActividadesTable actividades={hito.actividades} />
      </div>
    </div>
  );
};

const ActividadesTable = ({ actividades }) => {
  // const { descripcion, ...metadatos } = actividad.metadatos;

  return (
    <Table striped bordered hover>
      <thead className="blue-grey darken-4 text-white text-uppercase">
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
