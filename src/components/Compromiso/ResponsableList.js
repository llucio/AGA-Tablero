import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
        <Grid item md={6}>
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

// const OrganizacionesResponsablesList = ({ organizaciones }) => {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

//   return (

//       {organizaciones.map((org) => (
//         <ListItem alignItems="flex-start" key={org.id}>
//           <ListItemAvatar>
//             <Avatar alt={org.nombre} />
//           </ListItemAvatar>
//           <ListItemText
//             primary={org.nombre}
//             secondary={
//               <React.Fragment>
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   className={classes.inline}
//                   color="textPrimary"
//                 >
//                   Ali Connors
//                 </Typography>
//                 {" — I'll be in your neighborhood doing errands this…"}
//               </React.Fragment>
//             }
//           />
//         </ListItem>
//       ))}

//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
// <ListItemText
//   primary="Oui Oui"
//   secondary={
//     <React.Fragment>
//       <Typography
//         component="span"
//         variant="body2"
//         className={classes.inline}
//         color="textPrimary"
//       >
//         Sandra Adams
//       </Typography>
//       {' — Do you have Paris recommendations? Have you ever…'}
//     </React.Fragment>
//   }
// />
//       </ListItem>
//     </List>
//   );
// };

export default ResponsableList;
