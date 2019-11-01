import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserMenu from './UserMenu';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  box_one: {
    padding: theme.spacing(0, 4),
    textAlign: 'center',
    backgroundColor: 'black',
  },
  box_two: {
    padding: theme.spacing(0, 7),
    textAlign: 'center',
    backgroundColor: 'black',
  },
  link: {
    margin: theme.spacing(1),
  },
}));

const Footer = props => {

	const classes = useStyles();

	return (

    <div className='black'>
			<Container >
				
				<Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="stretch"
				  spacing={4}
          className={classes.root}
				>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
	          	<Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
	              <CardMedia
	                component="img"
	                alt="Gobierno Abierto"
	                className={classes.media}
	                image="/assets/images/logo_sfp_vertical_blanco.svg"
	                title="Gobierno Abierto"
	              />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/logo_inai_footer.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/logo_sociedad_civil.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	      </Grid>

	      <Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={4}

				>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/article19.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/causa_natura.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/ong_contraloria_ciudadana.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_two}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/equis.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/fundar.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/gesoc.svg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	      </Grid>

	      <Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={4}

				>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/ilsb.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/imc.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_two}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/mexicoevalua.svg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/observatorio_nac.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/socialtic.svg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	        <Grid item xs={4}  sm={2}>
	          <Box className={classes.box_one}>
              <Link href="https://www.gob.mx/sfp" target="_blank" className={classes.link}>
                <CardMedia
                  component="img"
                  alt="Gobierno Abierto"
                  className={classes.media}
                  image="/assets/images/transparencia_mex.jpg"
                  title="Gobierno Abierto"
                />
              </Link>
	          </Box>
	        </Grid>
	      </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6} sm={4}>
            <Box className={classes.box_one}>
            <UserMenu />
            </Box>
          </Grid>
        </Grid>

      </Container>
     </div>

  );
};

export default Footer;
