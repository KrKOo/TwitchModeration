import { JwtPayload } from 'jsonwebtoken';

export interface AuthParams {
  tokenUri: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
  jwksUri: string;
}

export default abstract class Authentication {
  protected params: AuthParams;
  constructor(params: AuthParams) {
    this.params = params;
  }

  public abstract getPayload(authCode: string): Promise<JwtPayload | undefined>;

  protected abstract fetchData(authCode: string): Promise<JSON>;

  protected abstract verifyToken(
    token: string
  ): Promise<JwtPayload | undefined>;
}
