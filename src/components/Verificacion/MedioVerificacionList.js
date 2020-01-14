import React from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LoadingIndicator from '../LoadingIndicator';
import { useAuth } from '../../hooks';
import MedioCreatable from '../MedioCreatable';

const LIST_QUERY = loader('../../queries/MedioVerificacionList.graphql');

const MedioVerificacionList = ({ actividad }) => {
  const {
    data: { items: mediosVerificacion = [] } = {},
    loading,
    error,
    refetch
  } = useQuery(LIST_QUERY, {
    variables: {
      where: {
        actividad_id: { _eq: actividad.id }
      }
    },
    fetchPolicy: 'cache-and-network'
  });
  const { usuario, loading: authLoading } = useAuth();

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }
  if (authLoading || (loading && !mediosVerificacion))
    return <LoadingIndicator />;
  if (!mediosVerificacion) return null;

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
      {(responsableHito || responsableCompromiso) && (
        <MedioCreatable
          typename="medio_verificacion"
          parentKey="actividad_id"
          parentId={actividad.id}
          refetch={refetch}
        />
      )}
      <div>
        {mediosVerificacion.map(
          medioVerificacion =>
            console.log(medioVerificacion) || (
              <Box key={`mv-${medioVerificacion.id}`}>
                {medioVerificacion.archivos.map(
                  archivo =>
                    console.log('aaa', archivo) || (
                      <Link
                        taget="_blank"
                        key={`link-${archivo}`}
                        href={archivo}
                        color="inherit"
                        title={medioVerificacion.titulo}
                      >
                        <PictureAsPdfIcon /> {medioVerificacion.fecha_creacion}{' '}
                        {medioVerificacion.titulo}
                      </Link>
                    )
                )}
              </Box>
            )
        )}
      </div>
    </div>
  );
};

export default MedioVerificacionList;
