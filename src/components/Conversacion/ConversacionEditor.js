import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Editor, CollapsedEditor } from '@atlaskit/editor-core';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { useAuth } from '../../hooks';
import IntlProvider from '../IntlProvider';

const transformer = new JSONTransformer();

const getMutation = type => gql`
  mutation ConversationMutation($id: uuid!, $value: String!) {
    insert_conversacion(
      objects: { ${type}_id: $id, contenido: $value }
    ) {
      affected_rows
    }
  }
`;

const ConversationContainer = ({ item, refetch }) => {
  const { authenticated } = useAuth();
  const [mutate] = useMutation(getMutation(item.__typename));
  const [isExpanded, setIsExpanded] = useState(false);

  if (!authenticated) return null;

  const onSave = editorView => {
    mutate({
      variables: {
        id: item.id,
        value: JSON.stringify(transformer.encode(editorView.state.doc))
      }
    }).then(() => {
      refetch().then(() => {
        setIsExpanded(false);
      });
    });
  };

  return (
    <IntlProvider>
      <CollapsedEditor
        placeholder="¿Quieres añadir un comentario?"
        isExpanded={isExpanded}
        onFocus={() => setIsExpanded(true)}
      >
        <Editor
          appearance="comment"
          onSave={onSave}
          onCancel={() => setIsExpanded(false)}
        />
      </CollapsedEditor>
    </IntlProvider>
  );
};

const ConversationContainear = ({ item, refetch }) => {
  return (
    <Box>
      {/* <Conversation
          objectId={item.id}
          provider={provider}
          placeholder='Comentarios...'
          renderEditor={(Editor, props) => (
            <Editor
              {...props}
              locale='es'
              onSave={}
            />
          )}
        /> */}
    </Box>
  );
};

export default ConversationContainer;
