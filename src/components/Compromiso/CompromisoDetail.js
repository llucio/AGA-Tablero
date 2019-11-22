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
    <Box>
      {/* {usuario.administrador && (
        <Fab
          href={`/compromiso/${item.id}/editar`}
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
        >
          <EditIcon className={classes.extendedIcon} />
          Editar
        </Fab>
      )} */}
      <Editable item={item} path="titulo" onUpdate={refetch}>
        <h1>{item.titulo}</h1>
      </Editable>

      <hr className="line" />

      <Box
        className={classes.descripcion}
        p={3}
        fontWeight="fontWeightLight"
        fontSize={20}
      >
        <Editable html item={item} path="metadatos.descripcion" onUpdate={refetch}>
          <DataDisplay data={metadatos.descripcion} />
        </Editable>
      </Box>

      <Editable adminOnly item={item} path="metadatos.imagen" onUpdate={refetch}>
        {metadatos.imagen}
      </Editable>
      <Editable item={item} path="metadatos.descarga" onUpdate={refetch}>
        {metadatos.descarga}
      </Editable>
      <Editable item={item} path="metadatos.dependencia" onUpdate={refetch}>
        {metadatos.dependencia}
      </Editable>
      <Editable item={item} path="metadatos.responsables" onUpdate={refetch}>
        <DataDisplay data={metadatos.responsables} />
      </Editable>
      <Editable
        adminOnly
        item={item}
        path="metadatos.observaciones"
        onUpdate={refetch}
      >
        <DataDisplay data={metadatos.observaciones} />
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
              <Editable html item={item} path={`metadatos.${key}`} onUpdate={refetch}>
                <DataDisplay data={_.get(item, ['metadatos', key], '')} />
              </Editable>
            </TabPanel>
          ))}
        </SwipeableViews>
      </Box>

      <h1>Hitos</h1>
      <HitoList where={{ compromiso_id: { _eq: item.id } }} />
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

// const dateOptions = {
//   header: { month: 'long' },
//   footer: { year: 'numeric' },
//   value: { day: '2-digit' },
//   locale: 'es-MX'
// };

// const dateTheme = {
//   calendarIcon: {
//     textColor: 'blue', // text color of the header and footer
//     primaryColor: '#ccc', // background of the header and footer
//     backgroundColor: '#fafafa'
//   }
// };

// const Hito = ({ hito, refetch }) => {
//   const { descripcion } = hito.metadatos;
//   const classes = useStyles();

//   return (
//     <Box className={classes.panel}>
//       <ExpansionPanel className="vertical-margin-bottom-middle">
//         <ExpansionPanelSummary
//           className="grey lighten-4 text-uppercase"
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography className={classes.panel_heading}>
//             <Editable
//               item={hito}
//               path="metadatos.descripcion"
//               onUpdate={refetch}
//             >
//               <span className="semi-bold">{descripcion}</span>
//             </Editable>
//             <Editable
//               adminOnly
//               item={hito}
//               path="metadatos.ponderacion"
//               valueType="Int"
//               onUpdate={refetch}
//             >
//               <strong>{hito.metadatos.ponderacion}</strong>
//             </Editable>
//             <Editable
//               adminOnly
//               item={hito}
//               path="fecha_inicial"
//               type="date"
//               valueType="timestamptz"
//               onUpdate={refetch}
//             >
//               <strong>{!!hito.fecha_inicial && moment(hito.fecha_inicial).utc().format('D [de] MMMM [de] YYYY')}</strong>
//             </Editable>
//             <Editable
//               adminOnly
//               item={hito}
//               path="fecha_final"
//               type="date"
//               valueType="timestamptz"
//               onUpdate={refetch}
//             >
//               <strong>{!!hito.fecha_final && moment(hito.fecha_final).utc().format('D [de] MMMM [de] YYYY')}</strong>
//             </Editable>
//           </Typography>
//         </ExpansionPanelSummary>

//       </ExpansionPanel>
//     </Box>
//   );
// };

export default CompromisoDetail;
