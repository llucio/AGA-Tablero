import React from 'react';
import PropTypes from 'prop-types';
import MenuMovil from './MenuMovil';
import CardMedia from '@material-ui/core/CardMedia';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const base = process.env.WEBSITE_BASE_URL || 'https://gobabiertomx.org';

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
    <>
      <Hidden mdUp>
        {/*<MenuMovil pageWrapId={'page-wrap'} outerContainerId={'App'} />*/}
        <AppBar
          color="inherit"
          position="fixed"
          className="menu-transparente text-white"
        >
          <Toolbar>
            {/*<Button color="inherit" className="blue" size="large">
              .
            </Button>*/}
            <MenuMovil pageWrapId={'page-wrap'} outerContainerId={'App'} />
            <CardMedia
              component="img"
              alt="Gobierno Abierto"
              className={classes.media}
              image="/assets/images/logo.png"
              title="Gobierno Abierto"
              style={{ marginLeft: '50px' }}
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
          </Toolbar>
        </AppBar>
      </Hidden>

      <Hidden smDown>
        <div className={classes.root}>
          <ElevationScroll {...props}>
            <AppBar
              color="inherit"
              position="fixed"
              className="menu-transparente text-white"
            >
              <Container>
                <Toolbar>
                  <CardMedia
                    component="img"
                    alt="Gobierno Abierto"
                    className={classes.media}
                    image="/assets/images/logo.png"
                    title="Gobierno Abierto"
                  />
                  <Typography variant="h6" className={classes.title}>
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
              </Container>
            </AppBar>
          </ElevationScroll>
        </div>
      </Hidden>
    </>
  );
};

export default MenuPrincipal;
