import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import ActividadList from '../Actividad/ActividadList';
import Editable from '../Editable';

const useStyles = makeStyles((theme) => ({
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0),
  },
  panel: {
    width: '100%',
  },
  panel_heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AccionCard = ({ item: accion, refetch }) => {
  const classes = useStyles();
  const { compromisoSlug } = useParams();

  return (
    <Box className={classes.panel}>
      <Box className="">
        <a name={`accion-${accion.id}`} className="nameTopSpacing" />
        <h4 className="extra-bold">
          <Editable
            item={accion}
            path="titulo"
            label="Título"
            onUpdate={refetch}
          >
            <span>{accion.titulo || 'Sin título'}</span>
          </Editable>
        </h4>
        <div>
          <Editable
            item={accion}
            path="ponderacion"
            label="Ponderación"
            valueType="Float"
            onUpdate={() => {
              refetch();
            }}
          >
            Ponderación <span>{accion.ponderacion}%</span>
          </Editable>
        </div>
        <Box>
          <Button
            to={`/compromiso/${compromisoSlug}/${accion.id}`}
            component={Link}
            color="primary"
            className="blue-grey lighten-5"
          >
            <LinkIcon className={classes.extendedIcon} />
            Detalles y avance
          </Button>
        </Box>
        <Box>
          <ActividadList
            accionId={accion.id}
            where={{ accion_id: { _eq: accion.id } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AccionCard;
