import React from 'react';
import {
  get,
  keys,
  pick,
  has,
  pickBy,
  isObject,
  isArray,
  isBoolean,
  isString
} from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DataDisplay = ({ data, ...props }) => {
  if (isArray(data)) {
    const ValueComponent = props.valueContainer || Col;
    return (
      <Row>
        {data.map(value => (
          <ValueComponent key={value}>
            <DataDisplay key={value} data={value} {...props} />
          </ValueComponent>
        ))}
      </Row>
    );
  } else if (isObject(data)) {
    const Label = props.labelComponent || 'h3';
    const dataKeys = keys(props.keys || data).filter(key => has(data, key));

    return dataKeys.map(key => (
      <Row key={key}>
        <Col xs="3">
          <Label>{get(props.keys || {}, key, key)}</Label>
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
    console.log('ERROR', data);
    return null;
  }
};

export default DataDisplay;
