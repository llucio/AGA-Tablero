import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { slide as Menu } from 'react-burger-menu';
import '../../burguer-menu.css';

const base = process.env.WEBSITE_BASE_URL || 'https://gobabiertomx.org';

const useStyles = makeStyles(theme => ({
  menuLink: {
    marginRight: theme.spacing(2)
  }
}));

const MenuMovil = props => {
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

      <Typography
        variant="subtitle1"
        gutterBottoms
        style={{ marginTop: '20px' }}
      >
        <Link href={`${base}/`} color="inherit" className="light menu-item">
          Inicio
        </Link>
        <Link
          href={`${base}/quienes-somos`}
          color="inherit"
          className="light menu-item"
        >
          Quienes somos
        </Link>
        <Link
          href={`${base}/antecedentes`}
          color="inherit"
          className="light menu-item"
        >
          Antecedentes
        </Link>
        <Link
          href={`${base}/blog/`}
          color="inherit"
          className="light menu-item"
        >
          Blog
        </Link>
        <Link
          href={`${base}/plan1/`}
          color="inherit"
          className="light menu-item"
        >
          Planes de acción
        </Link>
        <Link href={`/`} color="inherit" className="light menu-item">
          Tablero
        </Link>
        <Link
          href={`${base}/contacto/`}
          color="inherit"
          className="light menu-item"
        >
          Contacto
        </Link>
      </Typography>
    </Menu>
  );
};

export default MenuMovil;
