import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CompromisoCard from './CompromisoCard';

const CompromisoGrid = ({ compromisos }) => {
  return (
    <Row>
      {compromisos.map(compromiso => (
        <CompromisoCard key={compromiso.id} compromiso={compromiso} />
      ))}
    </Row>
  );
};

export default CompromisoGrid;
