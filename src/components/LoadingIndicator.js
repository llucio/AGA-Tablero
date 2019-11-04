import React from 'react';
import Compo from '../lib/material-app/components/Loader';

const LoadingIndicator = ({ text = 'Cargando...' }) => (
  <div>{text}</div>
);

export default LoadingIndicator;
