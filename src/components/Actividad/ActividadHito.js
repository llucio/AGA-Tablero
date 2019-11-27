import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import Sortable from '../Sortable';
// import ActividadHitoTable from './ActividadHitoTable';
import EntregableList from '../Entregable/EntregableList';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

const ActividadHito = ({ where }) => {
  const classes = useStyles();

  const { data: { items: actividades = [] } = {}, loading, refetch, error } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !actividades) return <LoadingIndicator />;
  if (!actividades) return null;

  return (
    <div className="vertical-margin">
      <Box className={classes.rootTable}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Actividades</StyledTableCell>
              <StyledTableCell align="center">Estatus</StyledTableCell>
              <StyledTableCell align="center">Archivos</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {actividades.map(actividad => (
              <StyledTableRow key={actividad.id}>
                <StyledTableCell component="th" scope="actividad">
                  <Editable item={actividad} path="titulo" onUpdate={refetch}>
                    {actividad.titulo || 'Sin título'}
                  </Editable>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <CheckCircleIcon className="light-green-text" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EntregableList
                    where={{ hito_id: { _eq: actividad.hito_id } }}
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

export default ActividadHito;
