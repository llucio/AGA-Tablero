import React from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import moment from '../../utils/moment';
import LoadingIndicator from '../LoadingIndicator';
import { useAuth } from '../../hooks';
import MedioCreatable from '../MedioCreatable';

const LIST_QUERY = loader('../../queries/MedioVerificacionList.graphql');

const MedioVerificacionList = ({ actividad }) => {
  const { usuario, loading: authLoading, administrador } = useAuth();

  const {
    data: { items: mediosVerificacion } = {},
    loading: dataLoading,
    refetch
  } = useQuery(LIST_QUERY, {
    variables: {
      where: {
        actividad_id: { _eq: actividad.id }
      }
    }
  });

  if (authLoading || dataLoading) return <LoadingIndicator />;

  const responsableHito =
    usuario &&
    _.find(usuario.responsable_hitos, { hito_id: actividad.hito.id });
  const responsableCompromiso =
    usuario &&
    _.find(usuario.responsable_compromisos, {
      compromiso_id: actividad.hito.compromiso_id
    });

  return (
    <div>
      <div>
        {(mediosVerificacion || []).map(
          ({ id, archivos: [url] = [], titulo, fecha_creacion }) => (
            <Box key={`mv-${id}`}>
              <Link target="_blank" href={url} color="inherit" title={'p'}>
                {titulo} - {moment(fecha_creacion).format('LL')}
              </Link>
            </Box>
          )
        )}
      </div>
      {(responsableHito || responsableCompromiso || administrador) && (
        <MedioCreatable
          typename="medio_verificacion"
          parentKey="actividad_id"
          parentId={actividad.id}
          actividad={actividad}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MedioVerificacionList;
