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

const UPSERT_COMPROMISO_MUTATION = gql`
  mutation UpsertCompromiso($id: uuid, $titulo: String!, $metadatos: jsonb!) {
    insert_compromiso(
      objects: {
        id: $id
        titulo: $titulo
        metadatos: $metadatos
        # hardcodear provisionalmente ID del 4to plan de acción
        plan_id: "cdee46b2-17e6-4b20-8521-253e4617b0c7"
      }
      on_conflict: {
        constraint: compromiso_pkey
        update_columns: [titulo, metadatos]
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const CompromisoEdit = ({ match }) => {
  const [upsertCompromiso] = useMutation(UPSERT_COMPROMISO_MUTATION);
  const { loading, error, data: { compromiso = {} } = {} } = useQuery(
    COMPROMISO_QUERY,
    {
      skip: !match.params.id,
      variables: {
        id: match.params.id,
        full: true
      }
    }
  );
  const history = useHistory();

  const onComplete = survey => {
    const { titulo, hitos, ...metadatos } = survey.data;
    upsertCompromiso({
      variables: {
        id: match.params.id,
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
      <Survey.Survey
        data={{ ...compromiso, ...compromiso.metadatos }}
        json={hojaRutaJson}
        onComplete={onComplete}
      />
    </Col>
  );
};

export default CompromisoEdit;
