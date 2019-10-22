import React from 'react';
//import Row from 'react-bootstrap/Row';
import CompromisoCard from './CompromisoCard';

const CompromisoGrid = ({ compromisos }) => {
  return (
    <div className="vertical-margin-bottom">
      {compromisos.map(compromiso => (
        <CompromisoCard key={compromiso.id} compromiso={compromiso} />
      ))}
    </div>
  );
};

export default CompromisoGrid;
