import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Login = () => {
  let params: any;

  const clientID = process.env.REACT_APP_TWITCH_CLIENT_ID;
  if (clientID) {
    params = {
      client_id: clientID,
      redirect_uri: process.env.REACT_APP_TWITCH_REDIRECT_URI,
      response_type: 'code',
      scope: 'user:read:email openid',
      claims: `{ "id_token": { "email": null, "email_verified": null, "preferred_username": null, "picture": null }, "userinfo": { "picture": null } }`
    }
  }

  return (
    <div className={styles.Login}>
      <div className={styles.LoginForm}>
        <h1>Login</h1>
        <ul>
          <li><a href={`https://id.twitch.tv/oauth2/authorize?${new URLSearchParams(params)}`} className={styles.Twitch}><FontAwesomeIcon icon={faTwitch} /> Log in with Twitch</a></li>
          <li><a href={`https://id.twitch.tv/oauth2/authorize?${new URLSearchParams(params)}`} className={styles.Google}><FontAwesomeIcon icon={faGoogle} /> Log in with Google</a></li>
          <li><a href={`https://id.twitch.tv/oauth2/authorize?${new URLSearchParams(params)}`} className={styles.Facebook}><FontAwesomeIcon icon={faFacebook} /> Log in with Facebook</a></li>
        </ul>
      </div>
    </div >
  );
}

export default Login;
