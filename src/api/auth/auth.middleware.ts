import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private auth0Service: Auth0Service) {}
  async use(
    req: Request & { auth0Id?: string },
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
        const auth0User = await this.auth0Service.getUserByAuth0Id(auth0Id);
        console.log(auth0User);
      }
    }
    next();
  }
}
