import React, { useEffect } from 'react';
import styles from './Login.module.scss';

const Login = () => {
  let params: any;

  const clientID = process.env.REACT_APP_TWITCH_CLIENT_ID;
  if (clientID) {
    params = {
      client_id: clientID,
      redirect_uri: 'http://localhost:3002/auth/twitch',
      response_type: 'code',
      scope: 'user:read:email openid',
      claims: `{ "id_token": { "email": null, "email_verified": null, "preferred_username": null, "picture": null }, "userinfo": { "picture": null } }`
    }
  }

  console.log(`https://id.twitch.tv/oauth2/authorize?${new URLSearchParams(params)}`)

  return (
    <div className={styles.Login}>
      <a href={`https://id.twitch.tv/oauth2/authorize?${new URLSearchParams(params)}`}>Log IN</a>
    </div >
  );
}

export default Login;