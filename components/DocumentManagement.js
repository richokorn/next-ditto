import { css } from '@emotion/react';
import { useState } from 'react';

const sidebarItemStyle = css`
  margin-top: 1em;
  margin-bottom: 1em;
  width: 75%;
  opacity: 0.3;

  &:focus,
  &:hover {
    opacity: 1;
  }

  & * {
    width: 100%;
  }
`;

export default function DocumentManagement(props) {
  const [title, setTitle] = useState('');
  return (
    <div css={props.sidebarItemStyle}>
      <label>
        Title
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
    </div>
  );
}
