import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CompromisoNav from './CompromisoNav';
import CompromisoGrid from './CompromisoGrid';
import LoadingIndicator from './LoadingIndicator';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const COMROMISOS_QUERY = gql`
  query CompromisosQuery {
    compromisos: compromiso {
      id
      titulo
      fecha_creacion
      metadatos
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));


const CompromisoBrowser = () => {
  const classes = useStyles();
  const { data: { compromisos } = {}, loading, error } = useQuery(
    COMROMISOS_QUERY
  );
  if (error) return <div>Error</div>;

  return (
    
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {false && <CompromisoNav />}
        </Grid>
        <Grid item xs={12}>
          {loading || !compromisos ? (
            <LoadingIndicator />
          ) : (
            <CompromisoGrid compromisos={compromisos} />
          )}
        </Grid>
      </Grid>
    </div>

  );
};

export default CompromisoBrowser;
