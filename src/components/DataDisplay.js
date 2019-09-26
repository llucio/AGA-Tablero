import React from 'react';
import PropTypes from 'prop-types';
import { get, keys, has, isPlainObject, isArray, isBoolean, isString } from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parse from 'html-react-parser';

const DataDisplay = ({ data, ...props }) => {
  const { keyLabels, labelComponent = 'h3', listItemComponent: ListItemComponent = Col } = props;

  // Un objeto key/value renderea llave y un DataDisplay recursivo con el valor
  if (isPlainObject(data)) {
    const dataKeys = keys(keyLabels || data).filter(key => has(data, key));
    return dataKeys.map(key => (
      <Row key={key}>
        <Col xs="3">
          <labelComponent>{get(keyLabels || {}, key, key)}</labelComponent>
        </Col>
        <Col>
          <DataDisplay data={data[key]} {...props} />
        </Col>
      </Row>
    ));
  }

  // Una lista de valores renderea DataDisplay recursivamente
  else if (isArray(data)) {
    return (
      <Row>
        {data.map(value => (
          <ListItemComponent className="list-item" key={value}>
            <DataDisplay key={value} data={value} {...props} />
          </ListItemComponent>
        ))}
      </Row>
    )
  }

  // Un Boolean renderea el texto "Sí" o "No"
  else if (isBoolean(data)) {
    return <DataDisplay data={data ? 'Sí' : 'No'} {...props} />;
  }

  // Un String renderea un párrafo
  else if (isString(data)) {
    return parse(data);
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
