import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../../assets/css/header.css';
import '../../assets/css/efectos.css';

const GET_QUERY = loader('../../queries/CompromisoGetBySlug.graphql');

const defaultHeaderProps = {
  image: '/assets/images/home/gente.jpg',
  heading: '¡Conoce los avances de los compromisos de Gobierno Abierto',
  className: 'parallax elevation-3',
  subheading: null,
  headerArrow: false,
};

const Header = ({ headerProps }) => {
  const { compromisoSlug } = useParams();

  const { data: { item: [compromiso] = [] } = {} } = useQuery(GET_QUERY, {
    skip: !compromisoSlug,
    variables: {
      id: compromisoSlug,
    },
  });

  const finalHeaderProps = {
    ...defaultHeaderProps,
    ...headerProps,
  };

  const imageUrl = compromiso?.metadatos?.imagen || finalHeaderProps.image;

  return (
    <header
      //id="banner"
      className={finalHeaderProps.className}
      style={{ backgroundSize: 'cover', backgroundImage: `url(${imageUrl})` }}
    >
      <Box className="content gradiente">
        <Box className="container white-text">
          <Grid item xs={12} sm={12} md={10} lg={9} className="">
            <Typography
              variant="h3"
              gutterBottom
              className="strong shadow-text"
            >
              {finalHeaderProps.heading}
            </Typography>
            {finalHeaderProps.subheading && (
              <Typography
                variant="h5"
                gutterBottom
                className="light shadow-text"
              >
                {finalHeaderProps.subheading}
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>
      {finalHeaderProps.headerArrow && (
        <a href="#one" className="goto-next scrolly">
          Siguiente
        </a>
      )}
    </header>
  );
};

export default Header;
