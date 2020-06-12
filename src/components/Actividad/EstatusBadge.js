import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const ESTATUSES = {
  ninguno: {
    icon: <DoneIcon />,
    title: 'Por iniciar',
    fabClassName: 'grey lighten-2 white-text',
    siguiente: 'iniciado',
  },
  iniciado: {
    icon: <DoneAllIcon />,
    title: 'En proceso',
    fabClassName: 'amber white-text',
    siguiente: 'completo',
  },
  completo: {
    icon: <DoneAllIcon />,
    title: 'Completo',
    fabClassName: 'lime darken-2 white-text',
    siguiente: 'verificado',
  },
  verificado: {
    icon: <DoneAllIcon />,
    title: 'verificado',
    fabClassName: 'lime darken-4 white-text',
    siguiente: 'ninguno',
  },
};

const EstatusTooltip = ({ actividad, refetch }) => {
  const estatus = actividad.metadatos.estatus || 'ninguno';

  const { icon, title, fabClassName, siguiente } = ESTATUSES[estatus];

  const [executeChangeEstatus] = useMutation(gql`
    mutation ChangeActiviadEstatus($id: uuid!, $metadatos: jsonb!) {
      update_actividad(
        where: { id: { _eq: $id } }
        _append: { metadatos: $metadatos }
      ) {
        affected_rows
      }
    }
  `);

  console.log(actividad.id);
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
        // El estatus se actualizó correctamente, recargar datos
        refetch();
      })
      .catch((err) => {
        console.error('Ocurrió error al cambiar estatus: ', err);
      });
  };

  return (
    <div>
      <Tooltip title={title} placement="right">
        <Fab
          size="small"
          aria-label="status"
          style={{ margin: '5px' }}
          className={fabClassName}
          onClick={() => {
            if (siguiente) {
              handleChangeEstatus(siguiente);
            }
          }}
        >
          {icon}
        </Fab>
      </Tooltip>
    </div>
  );
};

export default EstatusTooltip;
