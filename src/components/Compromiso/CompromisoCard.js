import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

  // Imagen con caracteres aleatorios para evitar cache de navegador
  const imageUrl = `${defaultImage}?${compromiso.id}`;

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
        <Box className="pattern3 box-4">
          <Link
            to={`/compromiso/${compromiso.id}`}
            className="white-text shadow-text"
          >
            <Typography
              gutterBottom
              variant="h4"
              className="image-over extra-bold"
            >
              {index + 1}. {compromiso.titulo}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default CompromisoCard;
