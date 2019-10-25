import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RawHtml from './RawHtml';

// Para imágenes aleatorias (provisional)
const defaultImage = 'https://picsum.photos/300/300';
const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  card: {
    maxWidth: 340
  }
}));

const CompromisoCard = ({ compromiso }) => {
  const classes = useStyles();

  // Imagen con caracteres aleatorios para evitar cache de navegador
  const imageUrl = `${defaultImage}?${[...Array(10)].map(
    i => chars[(Math.random() * chars.length) | 0]
  ).join``}`;

  return (
    <Grid item xs={12} md={4} lg={4} className={classes.root}>
      <Box
        boxShadow={3}
        className="box-4 item-compromisos"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          height: '320px'
        }}
      >
        <Box
          className="pattern3"
        >
          <Link
            to={`/compromiso/${compromiso.id}`}
            className="white-text shadow-text"
          >
            <Typography gutterBottom variant="h4" className="image-over extra-bold">
              {compromiso.titulo}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default CompromisoCard;
