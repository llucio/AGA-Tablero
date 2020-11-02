import { useMutation, gql } from '@apollo/client';
import PrevIcon from '@material-ui/icons/SkipPrevious';
import NextIcon from '@material-ui/icons/SkipNext';
import AccessAlarms from '@material-ui/icons/AccessAlarms';
import Timelapse from '@material-ui/icons/Timelapse';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '5px auto',
  },
}));

const ESTATUSES = {
  ninguno: {
    icon: <AccessAlarms />,
    title: 'Por iniciar',
    fabClassName: 'aga-grey-2 white-text',
    siguiente: 'iniciado',
  },
  iniciado: {
    icon: <Timelapse />,
    title: 'En proceso',
    fabClassName: 'aga-orange-1 white-text',
    siguiente: 'completo',
    anterior: 'ninguno',
  },
  completo: {
    icon: <DoneIcon />,
    title: 'Completo',
    fabClassName: 'aga-blue-1 white-text',
    siguiente: 'verificado',
    anterior: 'iniciado',
  },
  verificado: {
    icon: <DoneAllIcon />,
    title: 'Verificado',
    fabClassName: 'aga-green-2 white-text',
    anterior: 'completo',
  },
};

const loadingClassName = 'grey lighten-2 white-text';

const EstatusTooltip = ({ actividad, refetch }) => {
  const { isAdministrador } = useAuth();
  const classes = useStyles();
  const estatus = actividad.metadatos?.estatus || 'ninguno';
  const { icon, title, fabClassName, siguiente, anterior } = ESTATUSES[estatus];

  const [executeChangeEstatus, { loading: mutationLoading }] = useMutation(gql`
    mutation ChangeActiviadEstatus($id: uuid!, $metadatos: jsonb!) {
      update_actividad(
        where: { id: { _eq: $id } }
        _append: { metadatos: $metadatos }
      ) {
        affected_rows
      }
    }
  `);

  const handleChangeEstatus = (newEstatus) => {
    executeChangeEstatus({
      variables: {
        id: actividad.id,
        metadatos: {
          estatus: newEstatus,
        },
      },
    })
      .then(() => {
        refetch(); // El estatus se actualizó correctamente, recargar datos
      })
      .catch((err) => {
        console.error('Error al cambiar estatus: ', err);
      });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.margin}>
        <Chip
          size="small"
          label={title}
          className={mutationLoading ? loadingClassName : fabClassName}
        />
      </Box>

      <Box className={classes.margin}>
        <Avatar
          alt={title}
          className={mutationLoading ? loadingClassName : fabClassName}
          style={{ margin: '0 auto' }}
        >
          {icon}
        </Avatar>
      </Box>

      {isAdministrador && (
        <Box className={classes.margin}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Tooltip
              placement="top"
              title={
                mutationLoading
                  ? 'Espere un momento...'
                  : anterior
                  ? `Retroceder a: ${ESTATUSES[anterior].title}`
                  : ''
              }
            >
              <Button
                color="secondary"
                size="small"
                disabled={mutationLoading || !anterior}
                startIcon={<PrevIcon />}
                onClick={() => {
                  if (anterior) {
                    handleChangeEstatus(anterior);
                  }
                }}
              >
                Retroceder
              </Button>
            </Tooltip>

            <Tooltip
              placement="top"
              title={
                mutationLoading
                  ? 'Espere un momento...'
                  : siguiente
                  ? `Avanzar a: ${ESTATUSES[siguiente].title}`
                  : ''
              }
            >
              <Button
                color="secondary"
                size="small"
                disabled={mutationLoading || !siguiente}
                endIcon={<NextIcon />}
                onClick={() => {
                  if (siguiente) {
                    handleChangeEstatus(siguiente);
                  }
                }}
              >
                Avanzar
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default EstatusTooltip;
