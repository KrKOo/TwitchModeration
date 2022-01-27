import { JwtPayload } from 'jsonwebtoken';

export interface AuthParams {
  tokenUri: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
  jwksUri: string;
}

export interface AuthPayload extends JwtPayload {
  email: string;
  email_verified: boolean;
  picture: string;
  preferred_username: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export default abstract class Authentication {
  protected params: AuthParams;
  constructor(params: AuthParams) {
    this.params = params;
  }

  public abstract getPayload(
    authCode: string
  ): Promise<AuthPayload | void | undefined>;

  protected abstract fetchData(authCode: string): Promise<JSON>;

  protected abstract verifyToken(
    token: string
  ): Promise<JwtPayload | undefined>;
}
