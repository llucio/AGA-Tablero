import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Conversation, ConversationResource } from '@atlaskit/conversation';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { useAuth } from '../../hooks';
import moment from '../../utils/moment';
import IntlProvider from '../IntlProvider';

const getMutation = type => gql`
  mutation ConversationMutation($id: uuid!, $value: String!) {
    insert_conversacion(
      objects: { ${type}_id: $id, contenido: $value }
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
  const { usuario, authenticated } = useAuth();
  const [mutate] = useMutation(getMutation(item.__typename));

  if (!authenticated) return null;

  return (
    <Box>
      <IntlProvider>
        <Conversation
          objectId={item.id}
          provider={provider}
          placeholder="Comentarios..."
          renderEditor={(Editor, props) => (
            <Editor
              {...props}
              locale="es"
              onSave={editorView => {
                mutate({
                  variables: {
                    id: item.id,
                    value: JSON.stringify(
                      transformer.encode(editorView.state.doc)
                    )
                  }
                }).then(() => {
                  refetch();
                  props.onCancel();
                });
              }}
            />
          )}
        />
      </IntlProvider>
    </Box>
  );
};

export default ConversationContainer;
