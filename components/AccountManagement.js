import { useState } from 'react';

export default function AccountManagement(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div css={props.sidebarItemStyle}>
      <label>
        Username
        <input
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <div className="xWrapper" css={props.xGap}>
        <button
          css={props.formStyle}
          onClick={() => {
            props.loginUser(username, password);
            setUsername('');
            setPassword('');
          }}
        >
          Login
        </button>
        <button
          css={props.formStyle}
          onClick={() => {
            props.registerUser(username, password);
            setUsername('');
            setPassword('');
          }}
        >
          Register
        </button>
      </div>
      <button
        css={props.formStyle}
        style={{ marginLeft: 0 }}
        onClick={() => {
          props.logoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
}
