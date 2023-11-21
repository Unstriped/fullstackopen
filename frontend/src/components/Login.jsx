import { useState, useEffect } from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';
import PropTypes from 'prop-types';

const Login = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Log in
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Login;
