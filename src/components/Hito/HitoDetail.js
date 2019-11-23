import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { DateTime } from 'luxon';
import { CalendarIcon } from 'react-calendar-icon';
import { ThemeProvider } from 'styled-components';
import Box from '@material-ui/core/Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DataDisplay from '../DataDisplay';
import LoadingIndicator from '../LoadingIndicator';

const GET_QUERY = loader('../../queries/HitoGet.graphql');

const HitoDetail = ({ match }) => {
  const { data: { item } = {}, loading, error } = useQuery(GET_QUERY, {
    variables: {
      id: match.params.id
    },
    fetchPolicy: 'cache-and-network'
  });

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return null;

  return <Hito hito={item} />;
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
    <Box>
      <h2>{descripcion}</h2>
      <hr className="line" />

      <Col className="mt-5">
        <Row>
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
    </Box>
  );
};

const ActividadesTable = ({ actividades }) => {
  // const { descripcion, ...metadatos } = actividad.metadatos;

  return (
    <Table striped bordered hoFver>
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

export default HitoDetail;
