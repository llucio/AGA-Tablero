import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataDisplay from './DataDisplay';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const defaultImage = 'https://images.unsplash.com/photo-1498661367879-c2085689eed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';

const CompromisoCard = ({ compromiso }) => {
  return (
    <Col xs={12} md={6} lg={4} className="post-item text-left">
      <Link to={`/compromiso/${compromiso.id}`} className="not-dotted">
        <img
          className="rounded img-fluid"
          style={{ height: '230px' }}
          src={compromiso.metadatos.imagen || defaultImage}
          alt="Gobierno Abierto"
        />
        <header>
          <h2>{compromiso.titulo}</h2>
          <span className="badge bg-red">{compromiso.metadatos.dependencia}</span>
        </header>
      </Link>
      <Row>
        <div style={{ minHeight: '200px' }}>{parse(compromiso.metadatos.descripcion)}</div>
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
