import express from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { AuthParams, TwitchAuth } from 'modules/authentication';

const router = express.Router();

const twitchParams: AuthParams = {
  client_id: process.env.TWITCH_CLIENT_ID as string,
  client_secret: process.env.TWITCH_CLIENT_SECRET as string,
  grant_type: process.env.TWITCH_GRANT_TYPE as string,
  redirect_uri: 'http://localhost:3002/auth/twitch',
  tokenUri: 'https://id.twitch.tv/oauth2/token',
  jwksUri: 'https://id.twitch.tv/oauth2/keys',
};

const twitchAuth = new TwitchAuth(twitchParams);

router.get('/twitch', (req, res, next) => {
  console.log(req.query.code);
  console.log(req.query.scope);
  if (!req.query.code) return;
  twitchAuth
    .getPayload(req.query.code as string)
    .then((payload: JwtPayload | undefined) => {
      console.log(payload);
    })
    .catch((err: any) => {
      console.error(err);
    });

  if (process.env.LOGIN_REDIRECT_URL)
    res.redirect(process.env.LOGIN_REDIRECT_URL);
});

export default router;
