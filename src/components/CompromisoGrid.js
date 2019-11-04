import React from 'react';
import CompromisoCard from './CompromisoCard';
import Grid from '@material-ui/core/Grid';

const CompromisoGrid = ({ compromisos }) => {
  return (
    <div className="vertical-margin-bottom">
      <h2>Compromisos</h2>
      <hr className="line" />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        {compromisos.map(compromiso => (
          <CompromisoCard key={compromiso.id} compromiso={compromiso} />
        ))}
      </Grid>
    </div>
  );
};

export default CompromisoGrid;
