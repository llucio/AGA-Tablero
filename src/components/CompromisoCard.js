import React from 'react';
import { get } from 'lodash';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import RawHtml from './RawHtml';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
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
    padding: theme.spacing(1),
    maxHeight: 340,
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



    <Grid
      item
      xs={12} md={4} lg={4}
      className={classes.root}
    >
        <Box
          boxShadow={3}
          className="box-4 item-compromisos"
          style={{ 
            backgroundImage: `url(http://placeimg.com/350/320/any)`, 
            backgroundSize: 'cover', 
            height: '320px',
          }}
        >
          <Link
            to={`/compromiso/${compromiso.id}`}
            className="white-text shadow-text"
          >
            <Typography gutterBottom variant="h4" className="image-over strong" >
              {compromiso.titulo}
            </Typography>
          </Link>
        </Box>
    </Grid>

  );
};

export default CompromisoCard;
