import { css } from '@emotion/react';
import { useState } from 'react';
import Lipsum from './Lipsum';

const editor = css`
  margin-top: 100px;

  div:focus {
    border: 0;
  }
`;

export default function Editor(props) {
  const [text, setText] = useState();
  return (
    <div
      css={editor}
      contentEditable="true"
      style={{
        caretColor: props.caretColor,
        borderColor: props.caretColor,
        // width: `${props.sliderValueWidth * 16}px`,
        width: `${props.sliderValueWidth}vw`,
        fontSize: `${props.sliderValueFontSize}px`,
      }}
      value={text}
      onChange={(event) => {
        setText(event.target.value);
      }}
      suppressContentEditableWarning
    >
      <Lipsum />
      {}
    </div>
  );
}
