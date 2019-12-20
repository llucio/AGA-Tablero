import React from 'react';
import { Conversation, ConversationResource } from '@atlaskit/conversation';
import esMessages from '@atlaskit/editor-core/dist/esm/i18n/es';
import Comment, {
  CommentTime,
  CommentAction,
  CommentEdited,
  CommentAuthor,
  CommentLayout
} from '@atlaskit/comment';
import { ReactRenderer } from '@atlaskit/renderer';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Avatar from '@atlaskit/avatar';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as es from 'react-intl/locale-data/es';
import moment from '../utils/moment';

addLocaleData(es);

const getMutation = ({ __typename: typename, id }) => gql`
  mutation ConversationMutation($value: String!) {
    insert_conversacion(
      objects: { ${typename}_id: "${id}", contenido: $value }
    ) {
      affected_rows
    }
  }
`;

const transformer = new JSONTransformer();

const provider = new ConversationResource({
  url: '',
  user: {}
});

const ConversationContainer = ({ item, refetch }) => {
  const [mutate] = useMutation(getMutation(item));

  return (
    <div>
      {(item.conversaciones || []).map(conversacion =>
        <Comment
          key={conversacion.id}
          avatar={<Avatar label={conversacion.usuario} size="medium" />}
          author={
            <CommentAuthor>
              {conversacion.usuario}
            </CommentAuthor>
          }
          type="autor"
          // edited={<CommentEdited>Edited</CommentEdited>}
          restrictedTo="Sólo para participantes"
          time={
            <CommentTime>
              {moment(conversacion.fecha_creacion).format('D [de] MMMM [de] YYYY')}}
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
      )}
      <IntlProvider locale="es" messages={esMessages}>
        <Conversation
          objectId={item.id}
          provider={provider}
          placeholder="Comentarios..."
          renderEditor={(Editor, props) => {
            const onSave = editorView => {
              const json = transformer.encode(editorView.state.doc);
              const value = JSON.stringify(json);

              mutate({ variables: { value } }).then(() => {
                refetch();
                props.onCancel();
              });
            };
            return <Editor {...props} locale="es" onSave={onSave} />;
          }}
        />
      </IntlProvider>
    </div>
  );
};

export default ConversationContainer;
