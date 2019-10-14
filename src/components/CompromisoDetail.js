import React from 'react';
import { gql } from 'apollo-boost';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useRoles } from '../hooks';
import DataDisplay from './DataDisplay';

const COMPROMISO_QUERY = loader('../queries/CompromisoQuery.graphql');

const CompromisoDetail = ({ match }) => {
  const { data: { compromiso } = {}, loading, error } = useQuery(
    COMPROMISO_QUERY,
    {
      variables: {
        id: match.params.id,
        full: true
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (loading) return <div>Cargando...</div>;
  if (error || !compromiso) return <h1>No encontrado</h1>;

  return (
    <Row>
      <Compromiso compromiso={compromiso} />
    </Row>
  );
};

const Compromiso = ({ compromiso }) => {
  const { usuario } = useRoles();

  return (
    <Col>
      {usuario.administrador && (
        <Row>
          <LinkContainer to={`/compromiso/${compromiso.id}/editar`}>
            <Button>Editar</Button>
          </LinkContainer>
        </Row>
      )}

      <h1>{compromiso.titulo}</h1>
      <DataDisplay
        data={compromiso.metadatos}
        labelComponent="h3"
        listItemComponent="li"
        keyLabels={{
          descripcion: 'Descripción',
          valores: 'Valores',
          adicional: 'Información adicional',
          antecedentes: 'Antecedentes',
          problematica: 'Problemática',
          alineacion2030: 'Alineación 2030'
        }}
      />
      {compromiso.hitos.map(hito => (
        <Hito key={hito.id} hito={hito} />
      ))}
    </Col>
  );
};

const dateOptions = {
  header: { month: 'long' },
  footer: { year: 'numeric' },
  value: { day: '2-digit' },
  locale: 'es-MX'
};

const dateTheme = {
  calendarIcon: {
    textColor: 'blue', // text color of the header and footer
    primaryColor: '#ccc', // background of the header and footer
    backgroundColor: '#fafafa'
  }
};

const Hito = ({ hito }) => {
  const { descripcion, ...metadatos } = hito.metadatos;
  return (
    <Row>
      <Col className="mt-5">
        <Row>
          <Col>
            <h2>{descripcion}</h2>
          </Col>
          <Col xs="2">
            <ThemeProvider theme={dateTheme}>
              <CalendarIcon
                date={DateTime.fromISO(hito.fecha_inicial).toJSDate()}
                options={dateOptions}
                theme={dateTheme}
              />
            </ThemeProvider>
          </Col>
        </Row>
        <DataDisplay
          data={metadatos}
          labelComponent="h3"
          keys={{
            descripcion: 'Descripción',
            valores: 'Valores',
            adicional: 'Información adicional',
            antecedentes: 'Antecedentes',
            problematica: 'Problemática',
            alineacion2030: 'Alineación 2030'
          }}
        />
        <ActividadesTable actividades={hito.actividades} />
      </Col>
    </Row>
  );
};

const ActividadesTable = ({ actividades }) => {
  // const { descripcion, ...metadatos } = actividad.metadatos;

  return (
    <Table striped bordered hover>
      <thead className="thead-dark text-uppercase">
        <tr>
          <th>#</th>
          <th>Actividad</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        {actividades.map((actividad, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{actividad.titulo}</td>
            <td>
              <div className="progress">
                <div
                  className="progress-bar light-green progress-bar-animated w-50 progress-bar-striped"
                  role="progressbar"
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompromisoDetail;
