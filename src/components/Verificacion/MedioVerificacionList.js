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

const MedioVerificacionList = ({ actividad }) => {
  const { usuario, loading: authLoading } = useAuth();

  if (authLoading) return <LoadingIndicator />;

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
        {(actividad.archivos || []).map(archivo => (
          <Box key={`mv-${archivo}`}>
            <Link target="_blank" href={archivo} color="inherit" title={'p'}>
              <PictureAsPdfIcon /> {medioVerificacion.fecha_creacion}{' '}
              {medioVerificacion.titulo}
            </Link>
          </Box>
        ))}
      </div>
      {(responsableHito || responsableCompromiso) && (
        <MedioCreatable
          typename="medio_verificacion"
          parentKey="actividad_id"
          parentId={actividad.id}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MedioVerificacionList;
