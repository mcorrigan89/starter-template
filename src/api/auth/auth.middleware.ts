import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/domain/user/user.service';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly userService: UserService,
  ) {}
  async use(
    req: Request & { auth0Id?: string; user?: User },
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    const authToken = authHeader?.split(' ')[1];
    if (authToken) {
      const verified = await this.auth0Service.verifyToken(authToken);
      if (typeof verified.sub === 'string') {
        const auth0Id = verified.sub;
        req.auth0Id = auth0Id;
        const user = await this.userService.getUserByAuth0Id(auth0Id);
        if (user) {
          req.user = user;
        } else {
          const auth0User = await this.auth0Service.getUserByAuth0Id(auth0Id);
          if (auth0User && auth0User.email && auth0User.name) {
            const user = await this.userService.createUser({
              name: auth0User.name,
              givenName: auth0User.given_name,
              familyName: auth0User.family_name,
              email: auth0User.email,
              emailVerified: auth0User.email_verified,
              auth0Id: auth0Id,
            });
            req.user = user;
          }
        }
      }
    }
    next();
  }
}
