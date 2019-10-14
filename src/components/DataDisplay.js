import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RawHtml from './RawHtml';

/**
 * Componente para despliegue genérico recursivo de datos
 */
const DataDisplay = ({ data, ...rest }) => {
  const {
    keyLabels,
    labelComponent: Label = 'h3',
    listItemComponent: ListItem = 'div'
  } = rest;

  // Un objeto key/value renderea llave y un DataDisplay recursivo con el valor
  if (_.isPlainObject(data)) {
    const dataKeys = _.keys(keyLabels || data).filter(key => _.has(data, key));
    return dataKeys.map(key => (
      <Row key={key}>
        <Col xs="3">
          <Label>{_.get(keyLabels || {}, key, key)}</Label>
        </Col>
        <Col>
          <DataDisplay data={data[key]} {...rest} />
        </Col>
      </Row>
    ));
  }

  // Una lista de valores renderea DataDisplay recursivamente
  else if (_.isArray(data)) {
    return (
      <Row>
        {data.map(value => (
          <ListItem className="list-item" key={value}>
            <DataDisplay key={value} data={value} {...rest} />
          </ListItem>
        ))}
      </Row>
    );
  }

  // Un Boolean renderea el texto "Sí" o "No"
  else if (_.isBoolean(data)) {
    return <DataDisplay data={data ? 'Sí' : 'No'} {...rest} />;
  }

  // Un String renderea un párrafo
  else if (_.isString(data)) {
    return <RawHtml as="span">{data}</RawHtml>;
  }

  // Valor de tipo desconocido
  else {
    console.error('Unexpected data', data);
    return null;
  }
};

DataDisplay.propTypes = {
  data: PropTypes.any.isRequired,
  keyLabels: PropTypes.object,
  labelComponent: PropTypes.elementType,
  valueComponent: PropTypes.elementType
};

export default DataDisplay;
