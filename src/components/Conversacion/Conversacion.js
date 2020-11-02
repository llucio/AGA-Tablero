import { useQuery, gql } from '@apollo/client';
import { ReactRenderer } from '@atlaskit/renderer';
import Comment, {
  CommentTime,
  CommentAction,
  // CommentEditedit
  CommentAuthor,
} from '@atlaskit/comment';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { useAuth } from '../../hooks';
import moment from '../../utils/moment';
import ConversacionEditor from './ConversacionEditor';

import '../../assets/css/comentarios.css';

const getQuery = (type) => gql`
  query ConversacionQuery($id: uuid!, $limit: Int = 100) {
    conversaciones: conversacion(
      where: { ${type}_id: { _eq: $id } }
      order_by: { fecha_creacion: desc }
      limit: $limit
    ) {
      id
      fecha_creacion
      contenido
      usuario {
        email
        nombre
        metadatos
        organizacion {
          id
          nombre
          metadatos
        }
      }
    }
  }
`;

const Conversacion = ({ item }) => {
  const { authenticated, usuario, isAdministrador } = useAuth();
  const {
    data: { conversaciones } = {},
    loading,
    error,
    refetch,
  } = useQuery(getQuery(item.__typename), { variables: { id: item.id } });

  if (error) return <div>Error</div>;

  let compromisoId;
  switch (item.__typename) {
    case 'compromiso':
      compromisoId = item.id;
      break;
    case 'accion':
      compromisoId = item.compromiso_id;
      break;
    case 'actividad':
      compromisoId = item.compromiso_id;
      break;
    default:
  }

  const compromisoAllowed =
    authenticated &&
    (isAdministrador ||
      usuario?.responsable_compromisos
        .map((rc) => rc.compromiso_id)
        .includes(compromisoId));

  return (
    <Box className="comment-content horizontal-padding vertical-padding ">
      {compromisoAllowed && (
        <Box className="mb-4">
          <ConversacionEditor item={item} refetch={refetch} />
        </Box>
      )}
      {!loading && !conversaciones?.length && <h4>Aún no hay comentarios</h4>}
      {conversaciones?.map((conversacion) => (
        <Box className="comment-border grey lighten-5 comment-padding comment-margin box-6">
          <Comment
            key={conversacion.id}
            avatar={<Avatar label={conversacion.usuario_email} size="large" />}
            author={
              <CommentAuthor>{conversacion.usuario.nombre}</CommentAuthor>
            }
            type={conversacion.usuario.organizacion.nombre}
            // edited={<CommentEdited>Edited</CommentEdited>}
            restrictedTo="Sólo para participantes"
            time={
              <CommentTime>
                {moment(conversacion.fecha_creacion).format(
                  'D [de] MMMM [de] YYYY'
                )}
              </CommentTime>
            }
            content={
              <ReactRenderer document={JSON.parse(conversacion.contenido)} />
            }
            actions={
              authenticated && [
                <CommentAction>
                  <Chip size="small" label="Responder" />
                </CommentAction>,
                <CommentAction>
                  <Chip size="small" label="Eliminar" />
                </CommentAction>,
                <CommentAction>
                  <Chip size="small" label="Clickable" label="Marcar" />
                </CommentAction>,
              ]
            }
          />
        </Box>
      ))}
    </Box>
  );
};

export default Conversacion;
