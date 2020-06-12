import React from 'react';

import './MultiColorProgressBar.css';

const MultiColorProgressBar = ({ readings = [] }) => {
  const values = readings.map((item, i) => {
    if (item.value > 0) {
      return (
        <div
          className="value"
          style={{ color: item.color, width: item.value + '%' }}
          key={i}
        >
          <span>{item.value}%</span>
        </div>
      );
    }

    return null;
  });

  const calibrations = readings.map((item, i) => {
    if (item.value > 0) {
      return (
        <div
          className="graduation"
          style={{ color: item.color, width: item.value + '%' }}
          key={i}
        >
          <span>|</span>
        </div>
      );
    }

    return null;
  });

  const bars = readings.map((item, i) => {
    if (item.value > 0) {
      return (
        <div
          className="bar"
          style={{ backgroundColor: item.color, width: item.value + '%' }}
          key={i}
        />
      );
    }

    return null;
  });

  const legends = readings.map((item, i) => {
    if (item.value > 0) {
      return (
        <div className="legend" key={i}>
          <span className="dot" style={{ color: item.color }}>
            ●
          </span>
          <span className="label">{item.name}</span>
        </div>
      );
    }

    return null;
  });

  return (
    <div className="multicolor-bar">
      {values && <div className="values">{values}</div>}

      <div className="scale">{calibrations == '' ? '' : calibrations}</div>
      <div className="bars">{bars == '' ? '' : bars}</div>
      <div className="legends">{legends == '' ? '' : legends}</div>
    </div>
  );
};

export default MultiColorProgressBar;

// let readings = [
//   {
//     name: 'Apples',
//     value: 60,
//     color: '#eb4d4b',
//   },
//   {
//     name: 'Blueberries',
//     value: 7,
//     color: '#22a6b3',
//   },
//   {
//     name: 'Guavas',
//     value: 23,
//     color: '#6ab04c',
//   },
//   {
//     name: 'Grapes',
//     value: 10,
//     color: '#e056fd',
//   },
// ];
