import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
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
        <h4 className="extra-bold" >
          <Editable
            item={hito}
            path="titulo"
            onUpdate={refetch}
          >
            <span>{hito.titulo || 'Sin título'}</span>
          </Editable>
        </h4>
        <div>
        <Editable
            html
            item={hito}
            path="metadatos.descripcion"
            onUpdate={refetch}
          >
            <span>{metadatos.descripcion}</span>
          </Editable>
        </div>
        <div>
          <Editable
            adminOnly
            item={hito}
            path="metadatos.ponderacion"
            valueType="Int"
            onUpdate={refetch}
          >
            <strong>{metadatos.ponderacion}</strong>
          </Editable>
          <Editable
            adminOnly
            item={hito}
            path="fecha_inicial"
            type="date"
            valueType="timestamptz"
            onUpdate={refetch}
          >
            <strong>
              {!!hito.fecha_inicial &&
                moment(hito.fecha_inicial)
                  .utc()
                  .format('D [de] MMMM [de] YYYY')}
            </strong>
          </Editable>
          <Editable
            adminOnly
            item={hito}
            path="fecha_final"
            type="date"
            valueType="timestamptz"
            onUpdate={refetch}
          >
            <strong>
              {!!hito.fecha_final &&
                moment(hito.fecha_final)
                  .utc()
                  .format('D [de] MMMM [de] YYYY')}
            </strong>
          </Editable>
          <ol>
            <ActividadList where={{ hito_id: { _eq: hito.id } }} />
          </ol>
        </div>

      </Box>
    </Box>
  );
};

export default HitoCard;
