import { css } from '@emotion/react';
import { useState } from 'react';
import CaretButtons from './CaretButtons';
import DocumentManagement from './DocumentManagement';
import Sliders from './Sliders';

const sidebar = css`
  position: sticky;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  height: 100vh;

  align-items: center;
`;

const hiddenItemStyle = css`
  margin-top: 1em;
  margin-bottom: 1em;
  width: 75%;
  opacity: 0;

  &:first-child {
    margin-top: 100px;
  }

  & * {
    width: 100%;
  }
`;

const sidebarItemStyle = css`
  margin-top: 1em;
  margin-bottom: 1em;
  width: 75%;
  opacity: 0.5;

  &:focus,
  &:hover {
    opacity: 1;
  }

  &:first-child {
    margin-top: 100px;
  }
  & * {
    width: 100%;
  }
`;

export default function Sidebar(props) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      className="vWrapper"
      css={sidebar}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsShown(false);
        }, 150)
      }
      style={{
        width: isShown ? '15vw' : '2em',
        minWidth: '2em',
        background: isShown ? '#4d4d4d' : '#383838',
      }}
    >
      <DocumentManagement
        sidebarItemStyle={isShown ? sidebarItemStyle : hiddenItemStyle}
      />
      <Sliders
        sidebarItemStyle={isShown ? sidebarItemStyle : hiddenItemStyle}
        setSliderValueWidth={props.setSliderValueWidth}
        sliderValueWidth={props.sliderValueWidth}
        sliderValueFontSize={props.sliderValueFontSize}
        setSliderValueFontSize={props.setSliderValueFontSize}
      />
      <CaretButtons
        sidebarItemStyle={isShown ? sidebarItemStyle : hiddenItemStyle}
        setCaretColor={props.setCaretColor}
      />
    </div>
  );
}
