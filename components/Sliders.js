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
    <div css={props.sidebarItemStyle} className="vWrapper">
      <label>
        Width
        <input
          onMouseEnter={() => {
            props.setHovered(true);
          }}
          onMouseLeave={() => {
            props.setHovered(false);
          }}
          css={slider}
          type="range"
          min="25"
          max="65"
          step="5"
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
          max="30"
          step="2"
          value={props.sliderValueWidth}
          onChange={(event) => {
            props.setSliderValueFontSize(event.target.value);
          }}
        />
      </label>
    </div>
  );
}
