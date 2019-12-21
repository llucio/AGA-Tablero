import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Conversation, ConversationResource } from '@atlaskit/conversation';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
import Comment, {
  CommentTime,
  CommentAction,
  CommentEdited,
  CommentAuthor,
  CommentLayout
} from '@atlaskit/comment';
import { ReactRenderer } from '@atlaskit/renderer';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import moment from '../../utils/moment';
import IntlProvider from '../IntlProvider';
import ConversacionEditor from './ConversacionEditor';

const transformer = new JSONTransformer();

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

const Conversacion = ({ item, refetch }) => {
  const { data: { conversaciones } = {}, error } = useQuery(
    getQuery(item.__typename),
    { variables: { id: item.id } }
  );

  if (error) return <div>Error</div>;

  return (
    <Box>
      {conversaciones?.map(conversacion => (
        <Comment
          key={conversacion.id}
          avatar={<Avatar label={conversacion.usuario} size='medium' />}
          author={<CommentAuthor>{conversacion.usuario}</CommentAuthor>}
          type='autor'
          // edited={<CommentEdited>Edited</CommentEdited>}
          restrictedTo='Sólo para participantes'
          time={
            <CommentTime>
              {moment(conversacion.fecha_creacion).format(
                'D [de] MMMM [de] YYYY'
              )}
              }
            </CommentTime>
          }
          content={
            <p>
              <ReactRenderer document={JSON.parse(conversacion.contenido)} />
            </p>
          }
          // actions={[
          //   <CommentAction>Reply</CommentAction>,
          //   <CommentAction>Edit</CommentAction>,
          //   <CommentAction>Like</CommentAction>
          // ]}
        />
      ))}
      <ConversacionEditor item={item} refetch={refetch} />
    </Box>
  );
};

export default Conversacion;
