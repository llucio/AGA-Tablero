import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom';
import ActividadList from '../Actividad/ActividadList';
import LinkIcon from '@material-ui/icons/Link';

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
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const HitoCard = ({ item: hito, refetch }) => {
  const classes = useStyles();
  const { compromisoSlug } = useParams();

  return (
    <Box className={classes.panel}>
      <Box className="vertical-margin-bottom-middle">
        <a name={`hito-${hito.id}`} />
        <h4 className="extra-bold">
          <Editable item={hito} path="titulo" label="Título" onUpdate={refetch}>
            <span>{hito.titulo || 'Sin título'}</span>
          </Editable>
        </h4>
        <Box>
          <Button
            to={`/compromiso/${compromisoSlug}/${hito.id}`}
            component={Link}
            color="primary"
          >
            <LinkIcon className={classes.extendedIcon} />
            Detalles
          </Button>
        </Box>
        <Box>
          <ActividadList
            hitoId={hito.id}
            where={{ hito_id: { _eq: hito.id } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HitoCard;
