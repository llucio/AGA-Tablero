import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/efectos.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import draftToHtml from 'draftjs-to-html';
import '../../assets/css/image-effects.css';

// Para imágenes aleatorias (provisional)
const defaultImage = 'https://picsum.photos/300/300';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  card: {
    maxWidth: 340,
  },
}));

const CompromisoCard = ({ item: compromiso, index }) => {
  const classes = useStyles();

  const conMedalla = false; // TODO: según comprosmiso completo/incompleto

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
          height: '320px',
        }}
      >
        <Flippy
          flipOnHover
          flipOnClick={false}
          flipDirection="horizontal"
          style={{ margin: 0, padding: 0, height: '320px' }} /// these are optional style, it is not necessary
        >
          <FrontSide style={{ padding: 0 }}>
            <Box
              className="img-gradiente box-4"
              style={{ position: 'relative' }}
            >
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
                {conMedalla && (
                  <img
                    src="/medal.png"
                    width={80}
                    style={{ position: 'absolute', top: -10 }}
                    alt="medalla"
                  />
                )}
              </Link>
            </Box>
          </FrontSide>
          <BackSide style={{ padding: 0 }}>
            <Box className="img-gradiente box-4">
              <Link
                to={`/compromiso/${compromiso.slug}`}
                className="white-text"
              >
                <Typography gutterBottom variant="body" className="image-over">
                  <div
                    style={{ overflow: 'hidden', height: '266px' }}
                    dangerouslySetInnerHTML={{
                      __html: compromiso.metadatos.descripcion,
                    }}
                  ></div>
                </Typography>
              </Link>
            </Box>
          </BackSide>
        </Flippy>
      </Box>
    </Grid>
  );
};

export default CompromisoCard;
