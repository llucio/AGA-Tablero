import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import MedioVerificacionList from '../Verificacion/MedioVerificacionList';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';

import AvTimerIcon from '@material-ui/icons/AvTimer';

import DataDisplay from '../DataDisplay';
import Editable from '../Editable';

const LIST_QUERY = loader('../../queries/ActividadList.graphql');

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

const useStyles = makeStyles(theme => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  marginButton: {
    margin: theme.spacing(1)
  },
  mediosCell: {
    minWidth: 400
  }
}));

const ActividadTable = ({ where }) => {
  const classes = useStyles();

  const {
    data: { items: actividades = [] } = {},
    loading,
    refetch,
    error
  } = useQuery(LIST_QUERY, {
    variables: {
      where
    },
    fetchPolicy: 'cache-and-network'
  });

  if (error) return <div>Error</div>;
  if (loading && !actividades) return <LoadingIndicator />;
  if (!actividades) return null;

  return (
    <div className="vertical-margin table-actividad">
      <Box className={classes.rootTable}>
        <Table
          responsive
          stickyHeader
          className={classes.table}
          aria-label="Lista de actividades"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Actividades</StyledTableCell>
              <StyledTableCell align="center">Estatus</StyledTableCell>
              <StyledTableCell className={classes.mediosCell} align="center">
                Medio de verificación
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {actividades.map(actividad => (
              <StyledTableRow key={actividad.id}>
                <StyledTableCell component="th" scope="actividad">
                  <Editable
                    item={actividad}
                    path="titulo"
                    label="Tíulo"
                    onUpdate={refetch}
                  >
                    <h5>
                      <strong>{actividad.titulo || 'Sin título'}</strong>
                    </h5>
                  </Editable>
                  <Editable
                    html
                    item={actividad}
                    path="metadatos.descripcion"
                    label="Descripción"
                    onUpdate={refetch}
                  >
                    <DataDisplay data={actividad.metadatos.descripcion || ''} />
                  </Editable>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <Tooltip title="¡Completo!" placement="right">
                      <Fab
                        size="small"
                        aria-label="status"
                        className="indigo darken-2 white-text"
                        style={{ margin: '5px' }}
                      >
                        <AvTimerIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title="En proceso" placement="right">
                      <Fab
                        size="small"
                        aria-label="status"
                        className="indigo white-text"
                        style={{ margin: '5px' }}
                      >
                        <BatteryCharging60Icon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Por iniciar" placement="right">
                      <Fab
                        size="small"
                        aria-label="status"
                        className="indigo lighten-2 indigo-text text-lighten-4"
                        style={{ margin: '5px' }}
                      >
                        <BatteryCharging20Icon />
                      </Fab>
                    </Tooltip>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MedioVerificacionList actividad={actividad} />
                  {/* <Editable
                    html
                    item={actividad}
                    path="metadatos.medio_verificacion"
                    label="Medio de verificación"
                    onUpdate={refetch}
                  >
                    <strong>{actividad.metadatos.medio_verificacion}</strong>
                  </Editable> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default ActividadTable;
