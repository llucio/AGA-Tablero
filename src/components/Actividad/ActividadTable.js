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
import DataDisplay from '../DataDisplay';
import Editable from '../Editable';
import EstatusBadge from './EstatusBadge';

// import AvTimerIcon from '@material-ui/icons/AvTimer';
// import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
// import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';
// import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const LIST_QUERY = loader('../../queries/ActividadList.graphql');

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  marginButton: {
    // margin: theme.spacing(1),
  },
  mediosCell: {
    minWidth: 300,
  },
}));

const ActividadTable = ({ where }) => {
  const classes = useStyles();

  const {
    data: { items: actividades = [] } = {},
    loading,
    refetch,
    error,
  } = useQuery(LIST_QUERY, {
    variables: {
      where,
    },
    fetchPolicy: 'cache-and-network',
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
            {actividades.map((actividad) => (
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
                  <EstatusBadge actividad={actividad} refetch={refetch} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MedioVerificacionList
                    actividad={actividad}
                    refetch={refetch}
                  />
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
