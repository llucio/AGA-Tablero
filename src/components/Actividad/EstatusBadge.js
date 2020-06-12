import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:150,
    height:50,
  },
}));

const ESTATUSES = {
  ninguno: {
    icon: <DoneIcon />,
    title: "Por iniciar",
    fabClassName: "grey lighten-2 white-text",
    siguiente: "iniciado",
    anterior: "ninguno ",
  },
  iniciado: {
    icon: <DoneAllIcon />,
    title: "En proceso",
    fabClassName: "amber white-text",
    siguiente: "completo",
    anterior: "ninguno",
  },
  completo: {
    icon: <DoneAllIcon />,
    title: "Completo",
    fabClassName: "lime darken-2 white-text",
    siguiente: "verificado",
    anterior: "iniciado",
  },
  verificado: {
    icon: <DoneAllIcon />,
    title: "verificado",
    fabClassName: "lime darken-4 white-text",
    siguiente: "verificado",
    anterior: "completo",
  },
};

const EstatusTooltip = ({ actividad, refetch }) => {
  const classes = useStyles();

  const estatus = actividad.metadatos.estatus || "ninguno";

  const { icon, title, fabClassName, siguiente, anterior } = ESTATUSES[estatus];

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

  //console.log(actividad.id);
  const handleChangeEstatus = (newEstatus) => {
    console.log("newEstatus: " + newEstatus);
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
        console.error("Ocurrió error al cambiar estatus: ", err);
      });
  };

  return (
    <div className={classes.root}>
      <Tooltip title={title} placement="top">
        <Fab
          size="small"
          aria-label="status"
          style={{ margin: "10px" }}
          className={fabClassName}
        >
          {icon}
        </Fab>
      </Tooltip>

      <ButtonGroup 
        variant="text" 
        color="primary" 
        aria-label="text primary button group"
      >
        <Button
            color="secondary"
            size="small"
            onClick={() => {
              if (anterior) {
                handleChangeEstatus(anterior);
              }
            }}
            disabled={title === "Por iniciar"}
        >{anterior}</Button>
        
        <Button
            color="primary"
            size="small"
            onClick={() => {
              if (siguiente) {
                handleChangeEstatus(siguiente);
              }
            }}
            disabled={title === "verificado"}
          >{siguiente}</Button>
      </ButtonGroup>
    </div>
  );
};

export default EstatusTooltip;
