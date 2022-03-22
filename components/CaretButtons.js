import { css } from '@emotion/react';

const white = css`
  border: solid 1px #ffffff;
  background: #ffffff;
`;
const yellow = css`
  border: solid 1px #ffff00;
  background: #ffff00;
`;
const cyan = css`
  border: solid 1px #00ffff;
  background: #00ffff;
`;
const orange = css`
  border: solid 1px #ffa500;
  background: #ffa500;
`;
const magenta = css`
  border: solid 1px #ff00ff;
  background: #ff00ff;
`;
const red = css`
  border: solid 1px #ff0000;
  background: #ff0000;
`;
const green = css`
  border: solid 1px #00ff00;
  background: #00ff00;
`;

const button = css`
  display: flex;

  margin-top: 1em;
  height: 2em;
  padding: 0.5em;
  border-radius: 0.2em;
  transition: 0s;
  opacity: 0.7;

  &:hover {
    border: inherit;
    border: solid 2px white;
    opacity: 1;
  }
`;

export default function CaretButtons(props) {
  return (
    <div css={props.sidebarItemStyle}>
      <div>Caret </div>
      <button
        css={[white, button]}
        onClick={() => props.setCaretColor('white')}
      />
      <button
        css={[yellow, button]}
        onClick={() => props.setCaretColor('yellow')}
      />
      <button
        css={[orange, button]}
        onClick={() => props.setCaretColor('orange')}
      />
      <button
        css={[cyan, button]}
        onClick={() => props.setCaretColor('cyan')}
      />
      <button
        css={[magenta, button]}
        onClick={() => props.setCaretColor('magenta')}
      />
      <button css={[red, button]} onClick={() => props.setCaretColor('red')} />
      <button
        css={[green, button]}
        onClick={() => props.setCaretColor('green')}
      />
    </div>
  );
}
