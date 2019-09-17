import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DataDisplay from './DataDisplay';
import { Link } from 'react-router-dom';

const keyLabels = {
  descripcion: 'Descripción',
  valores: 'Vaores de AGA',
  adicional: 'Información adicional'
};

const CompromisoCard = ({ compromiso }) => {
  return (
    <Col xs={12} md={6} lg={4} className="post-item text-left">
      <Link to={`/compromiso/${compromiso.id}`} className="not-dotted">
        <img
          className="rounded img-fluid"
          style={{ height: '230px' }}
          src="https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        />
        <header>
          <h2>{compromiso.titulo}</h2>
          <span className="badge bg-red">SAGARPA</span>
        </header>
      </Link>
      <Row>
        <DataDisplay data={compromiso.metadatos.descripcion} />
      </Row>
      <Row className="justify-content-center">
        <Link
          to={`/compromiso/${compromiso.id}`}
          className="text-uppercase mt-3 font-weight-bold button-outline"
        >
          Ver detalles
        </Link>
      </Row>
    </Col>
  );
};

export default CompromisoCard;
