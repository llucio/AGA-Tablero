import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import * as Survey from 'survey-react';
import hojaRutaJson from '../forms/hojaRuta';

import "survey-react/survey.css";
// Survey.defaultBootstrapMaterialCss.navigationButton = 'btn btn-lg red darken-4';
// Survey.defaultBootstrapMaterialCss.rating.item = 'btn btn-lg btn-success';
// Survey.defaultBootstrapMaterialCss.matrixdynamic.button = 'red';
// Survey.defaultBootstrapMaterialCss.matrixdynamic.buttonRemove = 'red darken-4';
Survey.StylesManager.applyTheme('default');
// Survey.StylesManager.applyTheme('bootstrapmaterial');

const EncuestaBrowser = () => {
  const [insertCompromiso] = useMutation(INSERT_COMPROMISO_MUTATION);
  const history = useHistory();

  const onComplete = survey => {
    const { titulo, ...metadatos } = survey.data;
    insertCompromiso({
      variables: {
        titulo,
        metadatos
      }
    })
      .then(({ data }) => {
        // Redirigir a página del compromiso recién insertado
        const id = data.insert_compromiso.returning[0].id;
        history.push(`/compromiso/${id}`);
      })
      .catch(error => {
        console.warn('Algo no salió bien', error);
      });
  };

  return (
    <Col>
      <h1>Hoja de ruta</h1>
      <Survey.Survey json={hojaRutaJson} onComplete={onComplete} />
    </Col>
  );
};

// Por el momento guardar JSON completo en el campo metadatos
const INSERT_COMPROMISO_MUTATION = gql`
  mutation($titulo: String!, $metadatos: jsonb!) {
    insert_compromiso(
      objects: {
        titulo: $titulo
        metadatos: $metadatos
        # hardcodear provisionalmente ID del 4to plan de acción
        plan_id: "cdee46b2-17e6-4b20-8521-253e4617b0c7"
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export default EncuestaBrowser;
