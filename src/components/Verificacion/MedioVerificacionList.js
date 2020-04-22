import React from 'react';
import _ from 'lodash';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { Image, Transformation } from 'cloudinary-react';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from '../../utils/moment';
import LoadingIndicator from '../LoadingIndicator';
import { useAuth } from '../../hooks';
import MedioCreatable from '../MedioCreatable';

const LIST_QUERY = loader('../../queries/MedioVerificacionList.graphql');
const storagePrefix = 'https://descarga.storage.apps.funcionpublica.gob.mx/';

const MedioVerificacionList = ({ actividad }) => {
  const { usuario, loading: authLoading, administrador } = useAuth();

  const {
    data: { items: mediosVerificacion } = {},
    loading: dataLoading,
    refetch,
  } = useQuery(LIST_QUERY, {
    variables: {
      where: {
        actividad_id: { _eq: actividad.id },
      },
    },
  });

  if (authLoading || dataLoading) return <LoadingIndicator />;

  const responsableHito =
    usuario &&
    _.find(usuario.responsable_hitos, { hito_id: actividad.hito.id });
  const responsableCompromiso =
    usuario &&
    _.find(usuario.responsable_compromisos, {
      compromiso_id: actividad.hito.compromiso_id,
    });

  return (
    <div>
      <div>
        {(mediosVerificacion || []).map(
          ({ id, archivos: [url] = [], titulo, fecha_creacion }) => (
            <Box key={`mv-${id}`}>
              <Image
                cloudName="gobmx"
                publicId={url.replace(storagePrefix, 'storage/')}
              >
                <Transformation
                  width="70"
                  height="70"
                  radius="max"
                  effect="sharpen"
                  crop="thumb"
                />
              </Image>
              <Link target="_blank" href={url} color="inherit">
                {titulo}
              </Link>
              {(responsableHito || responsableCompromiso || administrador) && (
                <IconButton color="primary">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
              <blockquote>
                <date>Cargado el {moment(fecha_creacion).format('LL')}</date>
              </blockquote>
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
