import { useState } from 'react';
import loginService from '../services/login';
import noteService from '../services/notes';

const Login = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userLoggingIn = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(userLoggingIn)
      );

      noteService.setToken(userLoggingIn.token);
      setUser(userLoggingIn);
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
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;