import React from 'react';
import { get } from 'lodash';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import RawHtml from './RawHtml';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const defaultImage = 'https://picsum.photos/200/300';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 340
  },
}));


//const LinkCompromiso = React.forwardRef((props, ref) => (
//  <RouterLink innerRef={ref} to={`${compromiso.id}`} {...props} />
//));

const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];

const CompromisoCard = ({ compromiso }) => {
  const classes = useStyles();

  return (



    <Grid item xs={4}>

      <Card className={classes.card} left>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Gobierno Abierto"
            height="140"
            image={compromiso.metadatos.imagen || defaultImage + '?' + [...Array(10)].map(i=>chars[Math.random()*chars.length|0]).join`` }
            title="Gobierno Abierto"
          />
        </CardActionArea>
        <CardContent>
          <Link to={`/compromiso/${compromiso.id}`} className="text-uppercase-">
            <Typography gutterBottom variant="h5" component="h2">
              {compromiso.titulo}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">
            <RawHtml>{get(compromiso, 'metadatos.descripcion')}</RawHtml>
          </Typography>
        </CardContent>
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
    </Grid>


  );
};

export default CompromisoCard;
