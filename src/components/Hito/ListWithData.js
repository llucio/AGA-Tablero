import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import arrayMove from 'array-move';
import HitoList from './List';
import LoadingIndicator from '../LoadingIndicator';
import { execute } from 'graphql';

// const COMPROMISO_QUERY = loader('../../queries/CompromisoQuery.graphql');

const HITOS_QUERY = gql`
  query HitosQuery($compromisoId: uuid!) {
    hitos: hito(
      where: { compromiso_id: { _eq: $compromisoId } }
      order_by: [{ orden: asc }, { fecha_creacion: asc }]
    ) {
      id
      titulo
      orden
      fecha_creacion
      fecha_inicial
      metadatos
      actividades(order_by: [{ orden: asc }, { fecha_creacion: asc }]) {
        id
        metadatos
      }
    }
  }
`;

const ORDEN_MUTATION = gql`
  mutation setOrden($orden: Int!, $id: uuid!) {
    update_hito(where: { id: { _eq: $id } }, _set: { orden: $orden }) {
      affected_rows
    }
  }
`;
  
const HitoListWithData = ({ hitos, refetch }) => {
  // const { data: { hitos } = {}, loading, error, refetch } = useQuery(
  //   HITOS_QUERY,
  //   {
  //     variables: {
  //       compromisoId
  //     }
  //   }
  // );

  const [mutateOrden, { data }] = useMutation(ORDEN_MUTATION);

  const onSort = ({ oldIndex, newIndex }) => {
    const mutations = arrayMove(hitos, oldIndex, newIndex).map(
      ({ id }, orden) => {
        mutateOrden({ variables: { orden, id } });
      }
    );
    Promise.all(mutations).then(refetch);
  };

  // if (error) return <div>Error</div>;
  // if (loading) return <LoadingIndicator />;
  // if (!hitos) return <h1>Sin datos</h1>;
  
  return <HitoList hitos={hitos} onSort={onSort} refetch={refetch} />;
};

export default HitoListWithData;
