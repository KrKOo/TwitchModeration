import express from 'express';
import knex from 'database';
import { transaction } from 'objection';

import { AuthParams, TwitchAuth } from 'modules/authentication';
import { User, Identity } from 'models';

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

router.get('/twitch', async (req, res, next) => {
  console.log(req.query.code);
  console.log(req.query.scope);
  if (!req.query.code) {
    return next({ status: 400 });
  }

  const payload = await twitchAuth.getPayload(req.query.code as string);
  if (!payload) {
    return next({ status: 400 });
  }

  try {
    await transaction(User, async (userModel) => {
      const user = await userModel
        .query()
        .insert({
          username: payload?.preferred_username,
          email: payload?.email,
          picture: payload?.picture,
          last_login: knex.fn.now(),
        })
        .onConflict('email')
        .merge();

      await user
        .$relatedQuery('identity')
        .insert({
          provider: 1,
          access_token: payload?.access_token,
          refresh_token: payload?.refresh_token,
          expires_at: knex.raw('? + ?', [knex.fn.now(), payload.expires_in]),
        })
        .onConflict(['id_user', 'provider'])
        .merge();
    });
  } catch (err) {
    console.error(err);
  }

  if (process.env.LOGIN_REDIRECT_URL)
    res.redirect(process.env.LOGIN_REDIRECT_URL);
});

export default router;
