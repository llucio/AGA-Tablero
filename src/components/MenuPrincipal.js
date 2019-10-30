import React from 'react';
import { useRoles } from '../hooks';

import UserMenu from './UserMenu';

import PropTypes from 'prop-types';

import CardMedia from '@material-ui/core/CardMedia';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    className: "shadow-text",
  },
  media: {
    height: 55,
    maxWidth: 60,
    marginRight: 10
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const MenuPrincipal = props => {
  const classes = useStyles();
  const { loading, authenticated, usuario, login, logout } = useRoles();

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar
          color="inherit"
          position="fixed"
          className="menu-transparente text-white"
        >
          
          
            <Container>
              
              <Hidden mdUp>

                <Toolbar>
                  <CardMedia
                    component="img"
                    alt="Gobierno Abierto"
                    className={classes.media}
                    image="/assets/images/logo.png"
                    title="Gobierno Abierto"
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    <strong>Alianza</strong> para el <strong> Gobierno<br />
                    Abierto MX</strong>
                  </Typography>
                  <Fab
                    color="inherit"
                    className="black"
                  >
                    <MenuIcon />
                  </Fab>
                </Toolbar>

              </Hidden>

              <Hidden smDown>
                <Toolbar>
                  <CardMedia
                    component="img"
                    alt="Gobierno Abierto"
                    className={classes.media}
                    image="/assets/images/logo.png"
                    title="Gobierno Abierto"
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    <strong>Alianza</strong> para el <strong> Gobierno<br />
                    Abierto MX</strong>
                  </Typography>
                  <Button color="inherit" className="normal">
                    Inicio
                  </Button>
                  <Button color="inherit" className="normal">
                    Quienes somos
                  </Button>
                  <Button color="inherit" className="normal">
                    Antecedentes
                  </Button>
                  <Button color="inherit" className="normal">
                    Blog
                  </Button>
                  <Button color="inherit" className="normal">
                    Planes de acción
                  </Button>
                  <Button color="inherit" className="normal">
                    Tablero
                  </Button>
                  <Button color="inherit" className="normal">
                    Contacto
                  </Button>
                </Toolbar>
              </Hidden>

            </Container>
          


        </AppBar>
      </ElevationScroll>
    </div>
  );
};

export default MenuPrincipal;
