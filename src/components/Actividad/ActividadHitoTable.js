import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import Editable from '../Editable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));



const ActividadHitoTable = ({ item: actividad, refetch }) => {

  const classes = useStyles();

  return (
    <Paper>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Actvidades</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Archivos</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </Paper>
  );
}


/*
const ActividadHitoTable = ({ item: actividad, refetch }) => {
  const classes = useStyles();
  const { metadatos = {} } = actividad;

  return (
    <Grid item xs={12} className={classes.root}>
      <Typography className="light" display="block">
        <Editable item={actividad} path="titulo" onUpdate={refetch}>
          <Link variant="body2" to={`/hito/${actividad.id}`}>
            <strong>{actividad.titulo} -</strong>
          <LinkIcon fontSize="small" />
          </Link>
        </Editable>
        <Editable
          adminOnly
          item={actividad}
          path="metadatos.medio_verificacion"
          valueType="String"
          onUpdate={refetch}
        >
          <strong>{metadatos.medio_verificacion}</strong>
        </Editable>
      </Typography>
    </Grid>
  );
};
*/


export default ActividadHitoTable;
