import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  root_grid: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(2),
  },
  descripcion: {
    padding: theme.spacing(0, 0, 6, 0),
  },
  institucion: {
    padding: theme.spacing(0, 0, 6, 0),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0),
  },
  panel: {
    width: '100%',
  },
  item: {
    margin: '0.3em 1em',
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const ActividadCard = ({ item: actividad, refetch }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <li className={classes.item}>
        <Typography className="light" display="block">
          <span>{actividad.titulo}</span>
        </Typography>
      </li>
    </Grid>
  );
};

export default ActividadCard;
