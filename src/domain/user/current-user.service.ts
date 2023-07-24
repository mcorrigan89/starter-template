import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';
import { UserRepository } from './user.repository';

@Injectable()
export class CurrentUserService {
  constructor(
    private readonly clsService: ClsService,
    private readonly auth0Service: Auth0Service,
    private readonly userRepository: UserRepository,
  ) {}

  async getCurrentUser() {
    const auth0Id = this.clsService.get('auth0Id');
    if (auth0Id) {
      const user = await this.userRepository.getUserByAuth0Id(auth0Id);
      return user;
    }
    return null;
  }
}
