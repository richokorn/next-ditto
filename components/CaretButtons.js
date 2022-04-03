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

export default function CaretButtons(props) {
  return (
    <div css={props.sidebarItemStyle}>
      <div>Caret Color</div>
      <div className="xWrapper">
        <button
          css={[white, props.buttonStyle]}
          onClick={() => props.setCaretColor('white')}
        />
        <button
          css={[yellow, props.buttonStyle]}
          onClick={() => props.setCaretColor('yellow')}
        />
        <button
          css={[orange, props.buttonStyle]}
          onClick={() => props.setCaretColor('orange')}
        />
        <button
          css={[cyan, props.buttonStyle]}
          onClick={() => props.setCaretColor('cyan')}
        />
        <button
          css={[magenta, props.buttonStyle]}
          onClick={() => props.setCaretColor('magenta')}
        />
        <button
          css={[red, props.buttonStyle]}
          onClick={() => props.setCaretColor('red')}
        />
        <button
          css={[green, props.buttonStyle]}
          onClick={() => props.setCaretColor('green')}
        />
      </div>
    </div>
  );
}
