// Import React dependencies.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Point, Text, Transforms } from 'slate';
// Import the Slate components and React plugin.
import { Editable, Slate, withReact } from 'slate-react';
import { getLocalStorage } from '../util/getLocalStorage';

// These are the seperate kinds of blocks we would like render in our component

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const Header1Element = (props) => {
  return <h1 {...props.attributes}>{props.children}</h1>;
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold and italic text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
      }}
    >
      {props.children}
    </span>
  );
};

// Define our own custom set of helpers.
const customEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  isHeader1BlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'h1',
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = customEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleItalicMark(editor) {
    const isActive = customEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor) {
    const isActive = customEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },

  toggleHeader1Block(editor) {
    const isActive = customEditor.isHeader1BlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'h1' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },
};

export default function SlateEditor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);

  // Mitigates the hydration issue.
  useEffect(() => {
    const localStorageDocumentContent = getLocalStorage('documentContent');
    if (localStorageDocumentContent) {
      editor.children = localStorageDocumentContent;
      props.setSlateValue(localStorageDocumentContent);
    }
  }, [editor, props.setSlateValue]);

  // Loads a document from the DocumentManagement.js buttons.
  useEffect(() => {
    const newValue = props.passedDocumentContent;
    if (newValue) {
      editor.children = newValue;
      props.setSlateValue(newValue);
    }
  }, [editor, props.passedDocumentContent]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'h1':
        return <Header1Element {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={props.slateValue}
      onChange={() => {
        // props.setSlateValue(props.slateValue);
        props.setSlateValue(editor.children);

        // editor.children = props.slateValue;
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type,
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          localStorage.setItem(
            'documentContent',
            JSON.stringify(editor.children),
          );
        }
      }}
    >
      {/* <button
        onClick={() => {
          editor.children = testValue;
          props.setSlateValue(testValue);
          localStorage.setItem('documentContent', JSON.stringify(testValue));
        }}
      >
        Button
      </button>
      <button onClick={() => props.isolateWords(editor.children)}>
        Isolate Words
      </button> */}
      <Editable
        style={{
          caretColor: props.caretColor,
          borderColor: props.caretColor,
          width: `${props.sliderValueWidth}vw`,
          fontSize: `${props.sliderValueFontSize}px`,
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case '`': {
              event.preventDefault();
              customEditor.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              customEditor.toggleBoldMark(editor);
              break;
            }

            case 'i': {
              event.preventDefault();
              customEditor.toggleItalicMark(editor);
              break;
            }

            case '1': {
              event.preventDefault();
              customEditor.toggleHeader1Block(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
