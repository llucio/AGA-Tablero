import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import CardActions from '@material-ui/core/CardActions';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import IconButton from '@material-ui/core/IconButton';
// import CardContent from '@material-ui/core/CardContent';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';

const responsablesQuery = gql`
  query OrganizacionesResponsables($id: uuid!) {
    organizaciones: organizacion(
      where: {
        usuarios: {
          responsable_compromisos: { compromiso: { id: { _eq: $id } } }
        }
      }
    ) {
      id
      nombre
      gobierno
      usuarios(
        where: { responsable_compromisos: { compromiso: { id: { _eq: $id } } } }
      ) {
        id: email
        email
        nombre
        metadatos
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ResponsableList = ({ compromisoId }) => {
  const classes = useStyles();
  const { data: { organizaciones = [] } = {} } = useQuery(responsablesQuery, {
    variables: { id: compromisoId },
  });
  return (
    <Grid container spacing={1}>
      {organizaciones.map((org) => (
        <Grid item md={6} key={org.id}>
          <Typography variant="h6">{org.nombre}</Typography>
          <List className={classes.root}>
            {org.usuarios.map((usuario) => (
              <ListItem alignItems="flex-start" key={usuario.email}>
                <ListItemAvatar>
                  <Avatar alt={usuario.nombre} />
                </ListItemAvatar>
                <ListItemText
                  primary={usuario.nombre}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {usuario.email}
                      </Typography>
                      — {usuario.nombre}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResponsableList;
