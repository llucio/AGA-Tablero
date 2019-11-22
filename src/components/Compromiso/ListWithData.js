import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import arrayMove from 'array-move';
import CompromisoList from './List';
import LoadingIndicator from '../LoadingIndicator';
import { execute } from 'graphql';

const COMROMISOS_QUERY = gql`
  query CompromisosQuery {
    compromisos: compromiso(
      order_by: [{ orden: asc }, { fecha_creacion: asc }]
    ) {
      id
      titulo
      orden
      fecha_creacion
      metadatos
    }
  }
`;

const ORDEN_MUTATION = gql`
  mutation setOrden($orden: Int!, $id: uuid!) {
    update_compromiso(where: { id: { _eq: $id } }, _set: { orden: $orden }) {
      affected_rows
    }
  }
`;

const ComproisoListWithData = () => {
  const { data: { compromisos } = {}, loading, error, refetch } = useQuery(
    COMROMISOS_QUERY
  );

  const [mutateOrden, { data }] = useMutation(ORDEN_MUTATION);

  const onSort = ({ oldIndex, newIndex }) => {
    const mutations = arrayMove(compromisos, oldIndex, newIndex).map((compromiso, index) => {
      mutateOrden({ variables: { orden: index, id: compromiso.id }});
    })
    Promise.all(mutations).then(refetch);
  }

  if (error) return <div>Error</div>;
  if (loading) return <LoadingIndicator />;
  if (!compromisos) return <h1>Sin datos</h1>;

  return <CompromisoList compromisos={compromisos} onSort={onSort} />;
};

export default ComproisoListWithData;
