import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import Editable from '../Editable';

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

const ActividadCard = ({ item: actividad, refetch }) => {
  const classes = useStyles();
  const { metadatos = {} } = actividad;

  return (
    <Grid item xs={12} className={classes.root}>
      <li>
        <Typography className="light" display="block">
            <Link variant="body2" to={`/hito/${actividad.hito_id}`}>
            <span>{actividad.titulo || 'Sin título'}</span>
            </Link>
            <span>{metadatos.descripcion}</span>
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
      </li>
    </Grid>
  );
};

export default ActividadCard;
