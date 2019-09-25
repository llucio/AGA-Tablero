import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CompromisoNav from './CompromisoNav';
import CompromisoGrid from './CompromisoGrid';

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

const CompromisoBrowser = () => {
  const { data: { compromisos } = {}, loading, error } = useQuery(
    COMROMISOS_QUERY
  );
  if (error) return <div>Error</div>;

  return (
    <Row>
      <Col xs={12} className="ustify-content-end">
        <CompromisoNav />
      </Col>
      <Col cs={12}>
        {loading || !compromisos ? (
          <Col>Cargando...</Col>
        ) : (
          <CompromisoGrid compromisos={compromisos} />
        )}
      </Col>
    </Row>
  );
};

export default CompromisoBrowser;
