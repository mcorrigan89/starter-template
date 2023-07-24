import { Args, Query, Resolver } from '@nestjs/graphql';
import { SignInTokenType } from './auth.dto';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';

@Resolver()
export class AuthResolver {
  constructor(private auth0Service: Auth0Service) {}

  @Query(() => SignInTokenType)
  async tokenFromCode(@Args('code', { type: () => String }) code: string) {
    const verifiedToken = await this.auth0Service.tokenFromCode(code);
    return verifiedToken;
  }

  @Query(() => String)
  async verifyToken(@Args('token', { type: () => String }) token: string) {
    const verifiedToken = await this.auth0Service.verifyToken(token);
    return verifiedToken;
  }
}
