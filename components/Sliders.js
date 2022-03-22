import { css } from '@emotion/react';

const slider = css`
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export default function Sliders(props) {
  return (
    <div css={props.sidebarItemStyle}>
      <label>
        Width
        <input
          css={slider}
          type="range"
          // min="40"
          // max="80"
          min="25"
          max="65"
          step="10"
          value={props.sliderValueWidth}
          onChange={(event) => {
            props.setSliderValueWidth(event.target.value);
          }}
        />
      </label>
      <label>
        Font Size
        <input
          css={slider}
          type="range"
          min="10"
          max="40"
          step="5"
          value={props.sliderValueWidth}
          onChange={(event) => {
            props.setSliderValueFontSize(event.target.value);
          }}
        />
      </label>
    </div>
  );
}
