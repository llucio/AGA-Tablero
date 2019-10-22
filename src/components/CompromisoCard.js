import React from 'react';
import { get } from 'lodash';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import RawHtml from './RawHtml';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
//import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const defaultImage =
  'https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

//const LinkCompromiso = React.forwardRef((props, ref) => (
//  <RouterLink innerRef={ref} to={`${compromiso.id}`} {...props} />
//));

const CompromisoCard = ({ compromiso }) => {

  const classes = useStyles();

  return (

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Gobierno Abierto"
          height="140"
          image={compromiso.metadatos.imagen || defaultImage}
          title="Gobierno Abierto"
        />
        <CardContent>
          <Link
            to={`/compromiso/${compromiso.id}`}
            className="text-uppercase"
          >
            <Typography gutterBottom variant="h5" component="h2">
              {compromiso.titulo}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">
            <RawHtml>{get(compromiso, 'metadatos.descripcion')}</RawHtml>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Fab
          href={`/compromiso/${compromiso.id}`}
          color="primary"
          variant="contained"
        >
          Ver detalles <ChevronRightIcon />
        </Fab>

      </CardActions>
    </Card>

  );
};

export default CompromisoCard;
