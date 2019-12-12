import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import EntregableList from '../Entregable/EntregableList';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
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
          className={classes.table}
          aria-label="Lista de actividades"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Actividades</StyledTableCell>
              <StyledTableCell align="center">Estatus</StyledTableCell>
              <StyledTableCell align="center">
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
                  <h6 className="extra-bold mt-3">
                    Descripción/objetivo de la actividad
                  </h6>
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
                  {/* <CheckCircleIcon className="light-green-text" /> */}
                  <CheckCircleOutlineIcon /> Ninguno
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EntregableList
                    where={{ hito_id: { _eq: actividad.hito_id } }}
                  />
                  <Editable
                    adminOnly
                    html
                    item={actividad}
                    path="metadatos.medio_verificacion"
                    label="Medio de verificación"
                    onUpdate={refetch}
                  >
                    <strong>{actividad.metadatos.medio_verificacion}</strong>
                  </Editable>
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
