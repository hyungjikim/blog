import { socialLogin, login, signup } from './actions';

export default function LoginPage() {
  const googleLogin = socialLogin.bind(null, 'google');
  const githubLogin = socialLogin.bind(null, 'github');
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <button onClick={googleLogin}>Start with Google</button>
      <button onClick={githubLogin}>Start with Github</button>
    </>
  );
}
