import { css } from '@emotion/react';
import synonyms from 'synonyms';

const ulStyle = css`
  line-height: 1em;
  font-size: 1em;
  list-style: none;
`;

export default function WordCount(props) {
  if (props.counts !== undefined) {
    console.log('WordCount.js props.counts: ', props.counts);
    const swapped = Object.entries(props.counts).map(([key, value]) => [
      value,
      key,
    ]);
    console.log('WordCount.js swapped: ', swapped);
    swapped.sort((a, b) => b[0] - a[0]);

    const numbs = swapped.map((word) =>
      word[0] > 1 ? (
        <div
          key={Math.random()}
          style={{ paddingRight: '10px', borderRight: '1px solid white' }}
        >
          {word[0]}
        </div>
      ) : null,
    );

    const words = swapped.map((word) =>
      word[0] > 1 ? (
        <div style={{ paddingLeft: '10px' }} key={Math.random()}>
          {word[1]}
        </div>
      ) : null,
    );

    return (
      <div css={props.sidebarItemStyle}>
        <div>Word Count</div>
        <div className="xWrapper">
          <div style={{ textAlign: 'right', width: '15%' }}>{numbs}</div>
          <div>{words}</div>
        </div>
      </div>
    );
  }
}
