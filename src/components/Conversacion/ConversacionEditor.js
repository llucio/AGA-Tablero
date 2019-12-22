import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Editor, CollapsedEditor } from '@atlaskit/editor-core';
import Avatar from '@atlaskit/avatar';
import Box from '@material-ui/core/Box';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
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
  const [mutate] = useMutation(getMutation(item.__typename));
  const [isExpanded, setIsExpanded] = useState(false);

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
    <Box>
      <IntlProvider>
        <Container>
          <AvatarSection>
            <Avatar />
          </AvatarSection>
          <EditorSection>
            <CollapsedEditor
              placeholder="¿Quieres añadir un comentario?"
              isExpanded={isExpanded}
              onFocus={() => setIsExpanded(true)}
            >
              <Editor
                appearance="comment"
                shouldFocus
                onSave={onSave}
                onCancel={() => setIsExpanded(false)}
              />
            </CollapsedEditor>
          </EditorSection>
        </Container>
      </IntlProvider>
    </Box>
  );
};

const Container = styled.div`
  /* -ms- properties are necessary until MS supports the latest version of the grid spec */
  /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  /* stylelint-enable */
  grid-template:
    'avatar-area editor-area'
    / auto 1fr;
  padding-top: 16px;
  position: relative;

  &:first-child,
  &:first-of-type {
    padding-top: 0;
  }
`;

const AvatarSection: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  /* stylelint-disable value-no-vendor-prefix */
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  /* stylelint-enable */
  grid-area: avatar-area;
  margin-right: 8px;
`;

const EditorSection: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  /* stylelint-disable value-no-vendor-prefix */
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  /* stylelint-enable */
  grid-area: editor-area;
  /* min-width: 0; behavior is described here https://stackoverflow.com/a/43312314 */
  min-width: 0;
`;

export default ConversationContainer;
