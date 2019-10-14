import React from 'react';
import { get } from 'lodash';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import Survey from '../survey';
import hojaRutaJson from '../forms/hojaRuta';

const COMPROMISO_QUERY = loader('../queries/CompromisoQuery.graphql');

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

const CompromisoEdit = ({ match }) => {
  const [insertCompromiso] = useMutation(INSERT_COMPROMISO_MUTATION);

  const compromisoId = get(match, 'params.id');
  const { data: { compromiso } = {}, loading, error } = useQuery(
    COMPROMISO_QUERY,
    {
      skip: !compromisoId,
      variables: {
        id: compromisoId
      }
    }
  );
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

export default CompromisoEdit;
