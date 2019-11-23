import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import moment from '../../utils/moment';
import ActividadList from '../Actividad/List';
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

const HitoCard = ({ hito, refetch }) => {
  const { descripcion } = hito.metadatos;
  const classes = useStyles();

  // console.log('esssss', hito);

  return (
    <Box className={classes.panel}>
      <ExpansionPanel className="vertical-margin-bottom-middle">
        <ExpansionPanelSummary
          className="grey lighten-4 text-uppercase"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.panel_heading}>
            <Editable
              item={hito}
              path="metadatos.descripcion"
              onUpdate={refetch}
            >
              <span className="semi-bold">{descripcion}</span>
            </Editable>
          </Typography>
        </ExpansionPanelSummary>
        <div>
          <Editable
            adminOnly
            item={hito}
            path="metadatos.ponderacion"
            valueType="Int"
            onUpdate={refetch}
          >
            <strong>{hito.metadatos.ponderacion}</strong>
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
          <ActividadList actividades={hito.actividades} refetch={refetch} />
        </div>
      </ExpansionPanel>
    </Box>
  );
};

export default HitoCard;
