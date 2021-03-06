import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import LoadingIndicator from '../LoadingIndicator';
import Sortable from '../Sortable';
import ActividadCard from './ActividadCard';

const LIST_QUERY = loader('../../queries/ActividadList.graphql');

const ActividadList = ({ where, accionId }) => {
  const {
    data: { items: actividades = [] } = {},
    loading,
    error,
    refetch,
  } = useQuery(LIST_QUERY, {
    variables: {
      where,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <div>Error</div>;
  if (loading && !actividades) return <LoadingIndicator />;
  if (!actividades) return null;

  return (
    <ol className="vertical-margin-bottom">
      <Sortable
        typename="actividad"
        deletable
        creatable="accion_id"
        parentId={accionId}
        items={actividades}
        itemComponent={ActividadCard}
        refetch={refetch}
        axis="y"
      />
    </ol>
  );
};

export default ActividadList;
