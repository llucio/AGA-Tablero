import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { slide as Menu } from 'react-burger-menu';
import '../../assets/css/burguer-menu.css';

const WEBSITE_BASE_URL = 'https://gobabiertomx.org';

const useStyles = makeStyles((theme) => ({
  menuLink: {
    marginRight: theme.spacing(2),
  },
}));

const MenuMovil = (props) => {
  const classes = useStyles();

  return (
    <Menu {...props}>
      <Typography
        variant="subtitle1"
        gutterBottoms
        className={classes.title}
        style={{ widht: '100%' }}
      >
        <strong>Alianza</strong> para el{' '}
        <strong>
          {' '}
          Gobierno
          <br />
          Abierto MX
        </strong>
      </Typography>

      <Typography variant="subtitle1" gutterBottoms className={classes.links}>
        <WebsiteLink>Inicio</WebsiteLink>
        <WebsiteLink path="/quienes-somos">Quienes somos</WebsiteLink>
        <WebsiteLink path="/antecedentes">Antecedentes</WebsiteLink>
        <WebsiteLink path="/blog">Blog</WebsiteLink>
        <WebsiteLink path="/plan1">Planes de acción</WebsiteLink>
        <WebsiteLink base="">Tablero</WebsiteLink>
        <WebsiteLink path="/contacto/">Contacto</WebsiteLink>
      </Typography>
    </Menu>
  );
};

const WebsiteLink = ({
  base = WEBSITE_BASE_URL,
  path = '/',
  children,
  ...props
}) => (
  <Link
    href={base + path}
    color="inherit"
    className="light menu-item"
    {...props}
  >
    {children}
  </Link>
);

export default MenuMovil;
