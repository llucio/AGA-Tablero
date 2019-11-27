import React, { useState } from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { StickyContainer, Sticky } from 'react-sticky';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Editable from '../Editable';
import DataDisplay from '../DataDisplay';
import TabPanel from '../TabPanel';
import LoadingIndicator from '../LoadingIndicator';
import HitoList from '../Hito/HitoList.js';

const GET_QUERY = loader('../../queries/CompromisoGet.graphql');

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  margin: {
    margin: theme.spacing(2)
  },
  descripcion: {
    // padding: theme.spacing(0, 0, 6, 0)
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
    fontSize: theme.typography.pxToRem(24),
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

const CompromisoDetailNew = ({ match }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const { data: { item } = {}, loading, error, refetch } = useQuery(GET_QUERY, {
    variables: {
      id: match.params.id
    }
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  const { metadatos = {} } = item;

  const handleChange = (_, newIndex) => setTabIndex(newIndex);
  const handleChangeIndex = index => setTabIndex(index);

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
                <Box fontSize={18} style={style} className={isSticky ? classes.sticky : ''}>
                  <p className="active">
                    <Link href="#top">{item.titulo}</Link>
                  </p>
                  {(item.hitos || []).map(({ id, titulo, descripcion, metadatos: { pdescripcion } = {} }, i) => (
                    <p key={`sidebar-${id}`}>
                      <Link href={`#hito-${id}`}>{titulo}</Link>
                    </p>
                  ))}
                </Box>
              )}
            </Sticky>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Editable item={item} path="titulo" onUpdate={refetch}>
              <h1 className="extra-bold">{item.titulo}</h1>
            </Editable>

            <Box className={classes.descripcion}>
              <Editable
                html
                item={item}
                path="metadatos.descripcion"
                onUpdate={refetch}
              >
                <DataDisplay data={metadatos.descripcion || ''} />
              </Editable>
            </Box>

            <Editable
              adminOnly
              item={item}
              path="metadatos.imagen"
              onUpdate={refetch}
            >
              {metadatos.imagen}
            </Editable>
            <Editable item={item} path="metadatos.descarga" onUpdate={refetch}>
              {metadatos.descarga}
            </Editable>
            <Editable
              item={item}
              path="metadatos.dependencia"
              onUpdate={refetch}
            >
              {metadatos.dependencia}
            </Editable>
            <Editable
              item={item}
              path="metadatos.dependencia2"
              onUpdate={refetch}
            >
              {metadatos.dependencia2}
            </Editable>
            <Editable
              item={item}
              path="metadatos.dependencia3"
              onUpdate={refetch}
            >
              {metadatos.dependencia3}
            </Editable>
            <Editable
              item={item}
              path="metadatos.responsables"
              onUpdate={refetch}
            >
              <DataDisplay data={metadatos.responsables || ''} />
            </Editable>
            <Editable
              adminOnly
              item={item}
              path="metadatos.observaciones"
              onUpdate={refetch}
            >
              <DataDisplay data={metadatos.observaciones} />
            </Editable>

            <div className={classes.panel}>
              {compromisoTabs.map(({ key, label }, i) => (
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
                      <DataDisplay data={_.get(item, ['metadatos', key], '')} />
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
  { key: 'valores', label: 'Valores', icon: <VerifiedUserIcon /> },
  { key: 'adicional', label: 'Información', icon: <MenuBookIcon /> },
  { key: 'antecedentes', label: 'Antecedentes', icon: <BookmarksIcon /> },
  { key: 'problematica', label: 'Problemática', icon: <AssignmentLateIcon /> },
  { key: 'alineacion2030', label: 'Agenda 2030', icon: <VerticalSplitIcon /> },
  { key: 'solucionPlanteada', label: 'Solución', icon: <WbIncandescentIcon /> },
  { key: 'analisisRiesgo', label: 'Analisís de Riesgo', icon: <ListAltIcon /> },
  { key: 'otrosActores', label: 'Otros actores', icon: <PeopleAltIcon /> }
];

export default CompromisoDetailNew;
