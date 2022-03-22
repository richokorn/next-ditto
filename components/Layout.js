import { css } from '@emotion/react';
import { useState } from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import SlateEditor from './SlateEditor';
import SlateEditor2 from './SlateEditor2';

const layoutSidebar = css`
  position: sticky;
  left: 0px;
  top: 20px;
`;

const layoutEditor = css``;

const spacerLeft = css`
  margin-left: auto;
`;
const spacerRight = css`
  margin-right: auto;
`;

export default function Layout() {
  const [caretColor, setCaretColor] = useState();
  const [sliderValueWidth, setSliderValueWidth] = useState(45);
  const [sliderValueFontSize, setSliderValueFontSize] = useState(20);

  return (
    <main>
      <div className="xWrapper">
        <div css={layoutSidebar}>
          <Sidebar
            setCaretColor={setCaretColor}
            setSliderValueWidth={setSliderValueWidth}
            setSliderValueFontSize={setSliderValueFontSize}
          />
        </div>
        <div css={spacerLeft} />
        <div css={layoutEditor}>
          <h2>Slate Editor - with Command Hooks</h2>
          <i>Currently supports:</i>
          <table style={{ width: '100%' }}>
            <tr>
              <td>
                <code>Ctrl + Shift - `</code>
              </td>
              <td>Code format toggle</td>
            </tr>
            <tr>
              <td>
                <code>Ctrl - B</code>
              </td>
              <td>Bold format toggle</td>
            </tr>
          </table>
          <br />
          <SlateEditor />
          <br />
          <hr />
          <h2>Slate Editor - basic, for Saving/Loading</h2>
          <br />
          <SlateEditor2 />
          <br />
          <hr />
          <Editor
            caretColor={caretColor}
            sliderValueWidth={sliderValueWidth}
            sliderValueFontSize={sliderValueFontSize}
          />
        </div>

        <div css={spacerRight} />
      </div>
    </main>
  );
}
