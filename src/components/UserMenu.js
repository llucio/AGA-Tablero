import React from 'react';
import { useRoles } from '../hooks';
//import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';

import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PolicyIcon from '@material-ui/icons/Policy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    className: 'vertical-margin-bottom'
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
  button: {
    margin: theme.spacing(1)
  }
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
    <div className={classes.root}>
      {authenticated ? (
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Fab
            variant="container"
            color="secondary"
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
            <MenuItem onClick={handleClose}>Administrador</MenuItem>
            <MenuItem onClick={() => logout()}>Cerrar sesión</MenuItem>
          </Menu>
        </Grid>
      ) : (
        <Fab
          variant="container"
          color="secondary"
          aria-haspopup="true"
          aria-label="login"
          onClick={() => login()}
        >
          <AccountCircleIcon className={classes.extendedIcon} />
          Identifícate
        </Fab>
      )}
    </div>
  );
  return;
};

export default UserMenu;
