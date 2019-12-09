import React from 'react';
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

const base = 'https://gobabierto-staging.k8s.funcionpublica.gob.mx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    className: 'shadow-text'
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
                  <strong>Alianza</strong> para el{' '}
                  <strong>
                    {' '}
                    Gobierno
                    <br />
                    Abierto MX
                  </strong>
                </Typography>
                <Fab color="inherit" className="black">
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
                  <strong>Alianza</strong> para el{' '}
                  <strong>
                    {' '}
                    Gobierno
                    <br />
                    Abierto MX
                  </strong>
                </Typography>
                <Button href={`${base}/`} color="inherit" className="normal">
                  Inicio
                </Button>
                <Button
                  href={`${base}/quienes-somos`}
                  color="inherit"
                  className="normal"
                >
                  Quienes somos
                </Button>
                <Button
                  href={`${base}/antecedentes`}
                  color="inherit"
                  className="normal"
                >
                  Antecedentes
                </Button>
                <Button
                  href={`${base}/blog/`}
                  color="inherit"
                  className="normal"
                >
                  Blog
                </Button>
                <Button
                  href={`${base}/plan1/`}
                  color="inherit"
                  className="normal"
                >
                  Planes de acción
                </Button>
                <Button href={`/`} color="inherit" className="normal">
                  Tablero
                </Button>
                <Button
                  href={`${base}/contacto/`}
                  color="inherit"
                  className="normal"
                >
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
