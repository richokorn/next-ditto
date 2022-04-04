import { useState } from 'react';
import { getLocalStorage } from '../util/getLocalStorage';

export default function DocumentManagement(props) {
  const [documentTitle, setDocumentTitle] = useState(
    getLocalStorage('documentTitle'),
  );

  let content = [];

  if (typeof props.documentListByUserId[0] === 'string') {
    content = props.documentListByUserId.map((document) => (
      <div key={Math.random()}>{document}</div>
    ));
    return (
      <div css={props.sidebarItemStyle}>
        <label>
          Document Title
          <input
            placeholder="Document Title"
            value={documentTitle}
            onChange={(event) => {
              localStorage.setItem(
                'documentTitle',
                JSON.stringify(event.currentTarget.value),
              );
              setDocumentTitle(event.target.value);
            }}
          />
        </label>
        <hr />
        Documents:
        <div className="vWrapper">{content}</div>
      </div>
    );
  } else {
    content = props.documentListByUserId.map((document) => (
      <div key={document.id} className="xWrapper">
        <button
          title={`Document Title: ${document.documentTitle}`}
          css={[props.formStyle]}
          style={{ marginLeft: 0, justifyContent: 'left' }}
          onClick={() => {
            localStorage.setItem('documentId', document.id);
            localStorage.setItem('documentContent', document.documentContent);
            localStorage.setItem('documentTitle', document.documentTitle);
            setDocumentTitle(document.documentTitle);
            props.setPassedDocumentContent(
              JSON.parse(document.documentContent),
            );
          }}
        >
          {document.documentTitle}
        </button>
        <button
          title="Delete Document"
          style={{ maxWidth: 'min-content', backgroundColor: '#FF2222AA' }}
          css={[props.formStyle]}
          onClick={() => {
            props.deleteDocument(document.id);
          }}
        >
          X
        </button>
      </div>
    ));

    return (
      <div css={props.sidebarItemStyle}>
        <label>
          Document Title
          <input
            placeholder="Document Title"
            value={documentTitle}
            onChange={(event) => {
              localStorage.setItem('documentTitle', event.currentTarget.value);
              setDocumentTitle(event.target.value);
            }}
          />
        </label>
        <button css={props.formStyle} onClick={() => props.updateDocument()}>
          Save Document
        </button>
        <hr />
        Documents:
        <div className="vWrapper">{content}</div>
        <div>
          <button css={props.formStyle} onClick={() => props.createDocument()}>
            New Document
          </button>
        </div>
      </div>
    );
  }
}
