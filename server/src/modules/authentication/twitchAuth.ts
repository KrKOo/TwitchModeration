import Authentication, { AuthParams, AuthPayload } from './authentication';
import jwt, {
  JwtHeader,
  JwtPayload,
  Secret,
  SigningKeyCallback,
} from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';
import fetch from 'node-fetch';

export class TwitchAuth extends Authentication {
  constructor(params: AuthParams) {
    super(params);
  }

  public async getPayload(authCode: string) {
    return this.fetchData(authCode)
      .then((data) => {
        return Promise.all([data, this.verifyToken(data.id_token)]);
      })
      .then(([data, payload]) => {
        if (payload) {
          delete data.id_token;
          return { ...payload, ...data } as AuthPayload;
        }
      });
  }

  protected async fetchData(authCode: string) {
    try {
      const res = await fetch(this.params.tokenUri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.params.client_id,
          client_secret: this.params.client_secret,
          code: authCode,
          grant_type: this.params.grant_type,
          redirect_uri: this.params.redirect_uri,
        }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }

  protected verifyToken(token: string) {
    const client = jwksClient({
      jwksUri: this.params.jwksUri,
    });

    const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key: SigningKey) => {
        const signingKey: Secret =
          (key as jwksClient.CertSigningKey).publicKey ||
          (key as jwksClient.RsaSigningKey).rsaPublicKey;
        callback(err, signingKey);
      });
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, (err, decoded) => {
        if (err) reject(err);

        resolve(decoded);
      });
    }) as Promise<JwtPayload | undefined>;
  }
}
