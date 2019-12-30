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
                  <MenuButton href={`${base}/`} text="Inicio" />
                  <MenuButton
                    href={`${base}/quienes-somos/`}
                    text="Quiénes somos"
                  />
                  <MenuButton
                    href={`${base}/antecedentes/`}
                    text="Antecedentes"
                  />
                  <MenuButton href={`${base}/blog/`} text="Blog" />
                  <MenuButton href={`${base}/plan1/`} text="Planes de acción" />
                  <MenuButton href="/" text="Tablero" />
                  <MenuButton
                    href={`${base}/contacto/`}
                    text="Contacto"
                    class_alt="menu-spacing "
                  />
                </Toolbar>
              </Container>
            </AppBar>
          </ElevationScroll>
        </div>
      </Hidden>
    </>
  );
};

const MenuButton = ({ href, text, class_alt }) => (
  <Button href={href} color="inherit" className={`${class_alt} normal`}>
    {text}
  </Button>
);

export default MenuPrincipal;
