import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Avatar from '@atlaskit/avatar';
import { Editor, CollapsedEditor } from '@atlaskit/editor-core';
import { CommentLayout } from '@atlaskit/comment';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import IntlProvider from '../IntlProvider';

const transformer = new JSONTransformer();

const getMutation = (type) => gql`
  mutation ConversationMutation($id: uuid!, $value: String!) {
    insert_conversacion(
      objects: { ${type}_id: $id, contenido: $value }
    ) {
      affected_rows
    }
  }
`;

const ConversationContainer = ({ item, refetch }) => {
  const [mutate] = useMutation(getMutation(item.__typename));
  const [isExpanded, setIsExpanded] = useState(false);

  const onSave = (editorView) => {
    mutate({
      variables: {
        id: item.id,
        value: JSON.stringify(transformer.encode(editorView.state.doc)),
      },
    }).then(() => {
      refetch().then(() => {
        setIsExpanded(false);
      });
    });
  };

  return (
    <Box>
      <IntlProvider>
        <CommentLayout
          avatar={<Avatar />}
          content={
            <CollapsedEditor
              placeholder="¿Quieres añadir un comentario?"
              isExpanded={isExpanded}
              onFocus={() => setIsExpanded(true)}
            >
              <Editor
                primaryToolbarComponents={<div>Aaa</div>}
                secondaryToolbarComponents={<div>Aaa</div>}
                allowTextAlignment={false}
                textFormatting={{
                  disableCode: true,
                  disableSuperscriptAndSubscript: true,
                }}
                appearance="comment"
                shouldFocus
                onSave={onSave}
                onCancel={() => setIsExpanded(false)}
              />
            </CollapsedEditor>
          }
        />
      </IntlProvider>
    </Box>
  );
};

export default ConversationContainer;
