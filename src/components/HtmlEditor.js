import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const HtmlEditor = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (toHtml(editorState) === value) return; //added

    setEditorState(
      EditorState.push(
        editorState,
        ContentState.createFromBlockArray(htmlToDraft(value || ''))
      )
    );
  }, [value, editorState]);

  return (
    <div className="rich-editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        localization={{
          locale: 'es'
        }}
      />
    </div>
  );

  function onEditorStateChange(es) {
    setEditorState(es);
    const html = toHtml(es); //added
    if (value !== html) {
      onChange({ target: { name: 'text', value: html } });
    }
  }

  function toHtml(es) {
    return draftToHtml(convertToRaw(es.getCurrentContent())); // added
  }
};

export default HtmlEditor;
