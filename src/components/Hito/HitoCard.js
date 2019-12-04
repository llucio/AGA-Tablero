import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import moment from '../../utils/moment';
import ActividadList from '../Actividad/ActividadList';
import Editable from '../Editable';

const useStyles = makeStyles(theme => ({
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0)
  },
  panel: {
    width: '100%'
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const HitoCard = ({ item: hito, refetch }) => {
  const { metadatos = {} } = hito;
  const classes = useStyles();

  return (
    <Box className={classes.panel}>
      <Box className="vertical-margin-bottom-middle">
        <a name={`hito-${hito.id}`} />
        <h4 className="extra-bold">
          <Editable item={hito} path="titulo" onUpdate={refetch}>
            <span>{hito.titulo || 'Sin título'}</span>
          </Editable>
        </h4>
        <Box>
          <Link variant="body2" to={`/accion-clave/${hito.id}`}>
            <span>Detalles</span>
          </Link>
        </Box>
        <div>
          <ActividadList where={{ hito_id: { _eq: hito.id } }} />
        </div>
      </Box>
    </Box>
  );
};

export default HitoCard;
