import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';

@Injectable()
export class CurrentUserService {
  constructor(
    private readonly clsService: ClsService,
    private readonly auth0Service: Auth0Service,
  ) {}

  async getCurrentUser() {
    const auth0Id = this.clsService.get('auth0Id');
    if (auth0Id) {
      const user = await this.auth0Service.getUserByAuth0Id(auth0Id);
      return user;
    }
    return null;
  }
}
