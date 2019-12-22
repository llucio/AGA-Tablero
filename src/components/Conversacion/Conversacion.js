import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
import Comment, {
  CommentTime,
  CommentAction,
  CommentEdited,
  CommentAuthor
} from '@atlaskit/comment';
import { ReactRenderer } from '@atlaskit/renderer';
import { useAuth } from '../../hooks';
import moment from '../../utils/moment';
import ConversacionEditor from './ConversacionEditor';

const getQuery = type => gql`
  query ConversacionQuery($id: uuid!, $limit: Int = 100) {
    conversaciones: conversacion(
      where: { ${type}_id: { _eq: $id } }
      order_by: { fecha_creacion: desc }
      limit: $limit
    ) {
      id
      fecha_creacion
      usuario
      contenido
    }
  }
`;

const Conversacion = ({ item }) => {
  const { authenticated } = useAuth();
  const { data: { conversaciones } = {}, error, refetch } = useQuery(
    getQuery(item.__typename),
    { variables: { id: item.id } }
  );

  if (error) return <div>Error</div>;

  return (
    <Box>
      {authenticated && (
        <Box>
          <ConversacionEditor item={item} refetch={refetch} />
        </Box>
      )}
      {conversaciones?.map(conversacion => (
        <Comment
          key={conversacion.id}
          avatar={<Avatar label={conversacion.usuario} size="medium" />}
          author={<CommentAuthor>{conversacion.usuario}</CommentAuthor>}
          type="autor"
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
              <CommentAction>Responder</CommentAction>,
              <CommentAction>Eliminar</CommentAction>,
              <CommentAction>Marcar</CommentAction>
            ]
          }
        />
      ))}
    </Box>
  );
};

export default Conversacion;
