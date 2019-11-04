import React from 'react';
import { useRoles } from '../hooks';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import PolicyIcon from '@material-ui/icons/Policy';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4, 1),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

}));

const UserMenu = () => {
  const classes = useStyles();
  const { loading, authenticated, usuario, login, logout } = useRoles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return null;

  return (
    <Box className={classes.root}>
      {authenticated ? (
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Fab
            variant="extended"
            className="grey darken-4 grey-text text-darken-1"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {usuario.administrador ? (
              <PolicyIcon className={classes.extendedIcon} />
            ) : (
              <FaceIcon className={classes.extendedIcon} />
            )}
             Mi sesión
          </Fab>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              {usuario.name} ({usuario.email})
            </MenuItem>
            <MenuItem onClick="compromiso/nuevo">Crear compromiso</MenuItem>
            <MenuItem onClick={handleClose}>Administrador</MenuItem>
            <MenuItem onClick={() => logout()}>Cerrar sesión</MenuItem>
          </Menu>
        </Grid>
      ) : (

        <Fab
          variant="extended"
          className="grey darken-4 grey-text text-darken-1"
          aria-haspopup="true"
          aria-label="login"
          onClick={() => login()}
        >
          <PersonIcon className={classes.extendedIcon} /> Identifícate
        </Fab>

      )}
    </Box>
  );
};

export default UserMenu;
