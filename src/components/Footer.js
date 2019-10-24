import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'black',
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
				  alignItems="flex-start"
				  spacing={4}
				>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/logo_sfp_vertical_blanco.svg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/logo_inai_footer.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/logo_sociedad_civil.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	      </Grid>

	      <Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={4}

				>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/article19.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/causa_natura.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/ong_contraloria_ciudadana.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/equis.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/fundar.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/gesoc.svg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	      </Grid>

	      <Grid
				  container
				  direction="row"
				  justify="center"
				  alignItems="flex-start"
				  spacing={4}

				>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/ilsb.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/imc.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/mexicoevalua.svg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/observatorio_nac.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/socialtic.svg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	        <Grid item xs={2}>
	          <Paper className={classes.paper}>

              <CardMedia
                component="img"
                alt="Gobierno Abierto"
                className={classes.media}
                image="/assets/images/transparencia_mex.jpg"
                title="Gobierno Abierto"
              />

	          </Paper>
	        </Grid>
	      </Grid>

      </Container>
     </div>

  );
};

export default Footer;
