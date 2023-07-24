import { Injectable } from '@nestjs/common';
import { ManagementClient, AuthenticationClient } from 'auth0';
import * as jwt from 'jsonwebtoken';
import { env } from 'src/env';

@Injectable()
export class Auth0Service {
  private auth0ManagementClient: ManagementClient;
  private auth0AuthenticationClient: AuthenticationClient;

  constructor() {
    this.auth0ManagementClient = new ManagementClient({
      clientId: env.serverApiAuth0Config.options.audience,
      clientSecret: env.serverApiAuth0Config.secret.data,
      domain: env.serverApiAuth0Config.options.issuer,
      audience: `https://${env.serverApiAuth0Config.options.issuer}/api/v2/`,
    });

    this.auth0AuthenticationClient = new AuthenticationClient({
      clientId: env.clientAuth0Config.options.audience,
      clientSecret: env.clientAuth0Config.secret.data,
      domain: env.clientAuth0Config.options.issuer,
    });
  }

  async getUsers() {
    const users = await this.auth0ManagementClient.getUsers();
    return users;
  }

  async getUserByAuth0Id(id: string) {
    const user = await this.auth0ManagementClient.getUser({ id });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.auth0ManagementClient.getUsersByEmail(email);
    return user;
  }

  async verifyToken(accessToken: string) {
    const validatedToken = jwt.verify(
      accessToken,
      env.clientAuth0Config.publicKey,
      {
        algorithms: ['RS256'],
      },
    );
    return validatedToken;
  }

  async tokenFromCode(code: string) {
    if (this.auth0AuthenticationClient.oauth) {
      const token =
        await this.auth0AuthenticationClient.oauth.authorizationCodeGrant({
          code,
          redirect_uri: env.CLIENT_URL,
        });
      return token;
    } else {
      throw new Error('No oauth client');
    }
  }
}
