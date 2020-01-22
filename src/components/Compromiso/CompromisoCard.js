import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/efectos.css';
import '../../assets/css/image-effects.css';

// Para imágenes aleatorias (provisional)
const defaultImage = 'https://picsum.photos/300/300';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  card: {
    maxWidth: 340
  }
}));

const CompromisoCard = ({ item: compromiso, index }) => {
  const classes = useStyles();

  const imageUrl =
    compromiso.metadatos?.imagen || `${defaultImage}?${compromiso.id}`;

  return (
    <Grid item xs={12} md={4} lg={4} className={classes.root}>
      <Box
        boxShadow={3}
        className="box-6 item-compromisos efecto saturacion"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          height: '320px'
        }}
      >
        <Box className="img-gradiente box-4">
          <Link
            to={`/compromiso/${compromiso.slug}`}
            className="white-text shadow-text"
          >
            <Typography
              gutterBottom
              variant="h4"
              className="image-over extra-bold"
            >
              {compromiso.titulo}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default CompromisoCard;
