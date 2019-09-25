import React from 'react';
import { get, keys, has, isObject, isArray, isBoolean, isString } from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DataDisplay = ({ data, ...props }) => {
  const { keyLabels, labelComponent = 'h3', valueComponent = Col } = props;
  if (isArray(data)) {
    return (
      <Row>
        {data.map(value => (
          <valueComponent key={value}>
            <DataDisplay key={value} data={value} {...props} />
          </valueComponent>
        ))}
      </Row>
    );
  } else if (isObject(data)) {
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
  } else if (isBoolean(data)) {
    return <DataDisplay data={data ? 'Sí' : 'No'} {...props} />;
  } else if (isString(data)) {
    return <p>{data}</p>;
  } else {
    console.error('Unexpected data', data);
    return null;
  }
};

export default DataDisplay;
