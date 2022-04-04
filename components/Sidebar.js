import { css } from '@emotion/react';
import AccountManagement from './AccountManagement';
import CaretButtons from './CaretButtons';
import DocumentManagement from './DocumentManagement';
import Sliders from './Sliders';
import WordCount from './WordCount';

const sidebar = css`
  overflow-y: auto;
  overflow-x: hidden;

  position: sticky;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 0.5em;
  padding-right: 1em;

  align-items: center;
`;

const formStyle = css`
  display: flex;

  justify-content: center;

  color: inherit;
  background: #00000000;
  border-radius: 0.2em;
  transition: 0s;
  opacity: 0.7;

  &:not(:first-of-type) {
    margin-left: 0.2em;
  }

  &:hover {
    border: solid 2px #e6e6e6;
    opacity: 1;
  }

  &,
  &:active {
    opacity: 0.7;
  }
`;

const buttonStyle = css`
  display: flex;
  height: 2em;
  padding: 0.5em;
  border-radius: 0.2em;
  transition: 0s;
  opacity: 0.7;

  &:not(:first-of-type) {
    margin-left: 0.2em;
  }

  &:hover {
    /* border: inherit; */
    border: solid 2px white;
    opacity: 1;
  }

  &,
  &:active {
    opacity: 0.7;
  }
`;

export default function Sidebar(props) {
  return (
    <div className="vWrapper" css={[sidebar, props.isShown]}>
      <h2>Ditto</h2>
      <h4>Welcome {props.username}</h4>

      <DocumentManagement
        createDocument={props.createDocument}
        updateDocument={props.updateDocument}
        deleteDocument={props.deleteDocument}
        formStyle={formStyle}
        sidebarItemStyle={props.sidebarItemStyle}
        buttonStyle={buttonStyle}
        documentListByUserId={props.documentListByUserId}
        setPassedDocumentContent={props.setPassedDocumentContent}
      />
      <hr />
      <Sliders
        setHovered={props.setHovered}
        sidebarItemStyle={props.sidebarItemStyle}
        setSliderValueWidth={props.setSliderValueWidth}
        sliderValueWidth={props.sliderValueWidth}
        sliderValueFontSize={props.sliderValueFontSize}
        setSliderValueFontSize={props.setSliderValueFontSize}
      />
      <CaretButtons
        sidebarItemStyle={props.sidebarItemStyle}
        buttonStyle={buttonStyle}
        setCaretColor={props.setCaretColor}
      />
      <hr />
      <WordCount
        sidebarItemStyle={props.sidebarItemStyle}
        counts={props.counts}
      />
      <hr />
      <AccountManagement
        formStyle={formStyle}
        sidebarItemStyle={props.sidebarItemStyle}
        logoutUser={props.logoutUser}
        loginUser={props.loginUser}
        registerUser={props.registerUser}
      />
    </div>
  );
}
