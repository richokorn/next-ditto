import { css } from '@emotion/react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import SlateEditor from './SlateEditor';

import { isolateWords } from '../util/isolateWords';
import { defaultDocumentContent } from '../util/defaultDocumentContent';

const layoutSidebar = css`
  &::-webkit-scrollbar {
    display: none;
  }
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 0;
`;

const spacerLeft = css`
  margin-top: auto;
  margin-bottom: auto;

  margin-left: auto;
  border-left: solid 1px #38383800;

  height: 90vh;
  width: 2em;
`;
const spacerRight = css`
  margin-top: auto;
  margin-bottom: auto;

  margin-right: auto;
  border-right: solid 1px #38383800;

  height: 90vh;
  width: 2em;
`;

const hiddenItemStyle = css`
  margin-left: 0.5em;
  margin-right: 0.5em;
  width: 100%;
  opacity: 0;

  & * {
    width: 100%;
    margin-bottom: 0.5em;
  }
`;

const sidebarItemStyle = css`
  &::-webkit-scrollbar {
    display: none;
  }
  margin-left: 0.5em;
  margin-right: 0.5em;
  width: 90%;
  opacity: 0.5;
  z-index: 999;

  &:focus,
  &:hover {
    opacity: 1;
  }

  & * {
    width: 100%;
    margin-bottom: 0.5em;
  }
`;

export default function Layout(props) {
  const [caretColor, setCaretColor] = useState();
  const [sliderValueWidth, setSliderValueWidth] = useState(45);
  const [sliderValueFontSize, setSliderValueFontSize] = useState(20);
  const [isShown, setIsShown] = useState(false);
  const [slateValue, setSlateValue] = useState(defaultDocumentContent);
  const [passedDocumentContent, setPassedDocumentContent] = useState();
  const [hovered, setHovered] = useState(false);

  // And now for the magic: Duplication Detection

  const wordList = isolateWords(slateValue);

  function countUnique(iterable) {
    return new Set(iterable).size;
  }

  const arr = wordList;
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  // End of magic

  return (
    <main>
      <div className="xWrapper">
        <div
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          css={layoutSidebar}
          style={{
            width: isShown ? '16vw' : '3em',
            minWidth: '3em',
            background: isShown ? '#4d4d4d' : '#383838',
          }}
        >
          <Sidebar
            setHovered={setHovered}
            setCaretColor={setCaretColor}
            setSliderValueWidth={setSliderValueWidth}
            setSliderValueFontSize={setSliderValueFontSize}
            sidebarItemStyle={sidebarItemStyle}
            logoutUser={props.logoutUser}
            loginUser={props.loginUser}
            registerUser={props.registerUser}
            documentListByUserId={props.documentListByUserId}
            isShown={isShown ? sidebarItemStyle : hiddenItemStyle}
            setPassedDocumentContent={setPassedDocumentContent}
            updateDocumentById={props.updateDocumentById}
            counts={counts}
          />
        </div>
        <div
          style={
            hovered
              ? { borderLeft: '1px solid #E6E6E6' }
              : { borderLeft: '1px solid #272727' }
          }
          css={spacerLeft}
        />
        <div>
          {/* <h2>Slate Editor</h2> */}
          <br />
          <SlateEditor
            isolateWords={isolateWords}
            caretColor={caretColor}
            sliderValueWidth={sliderValueWidth}
            sliderValueFontSize={sliderValueFontSize}
            slateValue={slateValue}
            setSlateValue={setSlateValue}
            passedDocumentContent={passedDocumentContent}
            setPassedDocumentContent={setPassedDocumentContent}
            defaultDocumentContent={defaultDocumentContent}
          />
        </div>
        <div
          style={
            hovered
              ? { borderRight: '1px solid #E6E6E6' }
              : { borderRight: '1px solid #272727' }
          }
          className="spacerRight"
          css={spacerRight}
        />
      </div>
    </main>
  );
}
