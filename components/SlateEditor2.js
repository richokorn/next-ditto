import { css } from '@emotion/react';
// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Text, Transforms } from 'slate';
// Import the Slate components and React plugin.
import { Editable, Slate, withReact } from 'slate-react';

export default function SlateEditor2(props) {
  const editor = useMemo(() => withReact(createEditor()), []);

  // useEffect(() => {
  //   const editorContent = JSON.parse(localStorage.getItem('content'));
  // });

  let editorContent;

  function getLocalStorage(key) {
    try {
      // Abstracting the necessity of parse the value
      return JSON.parse(window.localStorage[key]);
    } catch (err) {
      return undefined;
    }
  }

  const [value, setValue] = useState(
    getLocalStorage('content') || [
      {
        type: 'paragraph',
        children: [{ text: 'Edit Me!' }],
      },
    ],
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);

        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type,
        );

        if (isAstChange) {
          // Save the value to Local Storage
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }
      }}
    >
      <Editable />
    </Slate>
  );
}
