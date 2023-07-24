import { Injectable } from '@nestjs/common';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class UserService {
  constructor(private readonly currentUserService: CurrentUserService) {}

  async getCurrentUser() {
    return this.currentUserService.getCurrentUser();
  }
}
