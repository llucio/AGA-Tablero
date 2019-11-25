
import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import Sortable from '../Sortable';
import ActividadHitoTable from './ActividadHitoTable';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


const LIST_QUERY = loader('../../queries/ActividadList.graphql');


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles(theme => ({
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));



const ActividadHito = ({ where }) => {
	const classes = useStyles();

  const { data: { items: actividades = [] } = {}, loading, error } = useQuery(
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
	                {actividad.titulo}
	              </StyledTableCell>
	              <StyledTableCell align="center">
	              	<CheckCircleIcon className="light-green-text" />
	              </StyledTableCell>
	              <StyledTableCell align="center">
	              	<PictureAsPdfIcon />
	              	<PictureAsPdfIcon />
	              </StyledTableCell>
	            </StyledTableRow>
	          ))}

	        </TableBody>
	      </Table>
	    </Box>


    </div>
  );
};


      /*<Sortable
        items={actividades}
        itemComponent={ActividadHitoTable}
        refetch={a => console.log(a)}
        axis="y"
      />*/


export default ActividadHito;


