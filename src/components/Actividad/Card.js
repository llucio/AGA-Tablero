import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import moment from '../../utils/moment';
import ActividadList from '../Actividad/List';
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

const ActividadCard = ({ actividad, refetch }) => {
  const { descripcion, medio_verificacion } = actividad.metadatos;
  const classes = useStyles();

  const i = 1;

  return (
    <Grid item xs={12}>
      <Typography className="light" display="block">
        <Editable item={actividad} path="titulo" onUpdate={refetch}>
          <Link variant="body2" href={`/hito/${actividad.id}`}>
            {i + 1}. {actividad.titulo}
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
          <strong>{medio_verificacion}</strong>
        </Editable>
      </Typography>
    </Grid>
  );
};

export default ActividadCard;
