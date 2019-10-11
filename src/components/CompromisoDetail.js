import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DataDisplay from './DataDisplay';

const CompromisoDetail = ({ match }) => {
  const { data: { compromiso } = {}, loading, error } = useQuery(
    COMPROMISO_QUERY,
    {
      variables: {
        id: match.params.id
      }
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
  return (
    <Col>
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
              <div class="progress">
                <div class="progress-bar light-green progress-bar-animated w-50 progress-bar-striped" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const COMPROMISO_QUERY = gql`
  query CompromisoQuery($id: uuid!) {
    compromiso: compromiso_by_pk(id: $id) {
      id
      titulo
      fecha_creacion
      metadatos
      hitos_aggregate {
        aggregate {
          count
        }
      }
      hitos(order_by: { fecha_inicial: asc }) {
        id
        metadatos
        titulo
        fecha_inicial
        fecha_final
        actividades_aggregate {
          aggregate {
            count
            min {
              fecha_finalizacion
            }
          }
        }
        actividades(order_by: { orden: asc }) {
          id
          orden
          titulo
          fecha_finalizacion
          metadatos
        }
      }
    }
  }
`;

export default CompromisoDetail;
