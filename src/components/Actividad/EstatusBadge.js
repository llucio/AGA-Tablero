import React from 'react';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const ESTATUSES = {
  ninguno: {
    icon: <DoneIcon />,
    title: 'Por iniciar',
    fabClassName: 'grey lighten-2 white-text'
  },
  iniciado: {
    icon: <DoneAllIcon />,
    title: 'En proceso',
    fabClassName: 'amber white-text'
  },
  completo: {
    icon: <DoneAllIcon />,
    title: 'Completo',
    fabClassName: 'lime darken-2 white-text'
  }
};

const EstatusTooltip = ({ estatus = 'ninguno' }) => {
  const { icon, title, fabClassName } = ESTATUSES[estatus];

  return (
    <div>
      <Tooltip title={title} placement="right">
        <Fab
          size="small"
          aria-label="status"
          style={{ margin: '5px' }}
          className={fabClassName}
        >
          {icon}
        </Fab>
      </Tooltip>
    </div>
  );
};

export default EstatusTooltip;
