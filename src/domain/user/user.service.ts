import { Injectable } from '@nestjs/common';
import { CurrentUserService } from './current-user.service';
import { CreateUserInput, UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly currentUserService: CurrentUserService,
  ) {}

  public async getCurrentUser(): Promise<User | null> {
    return this.currentUserService.getCurrentUser();
  }

  public async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  public async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  public async getUserByAuth0Id(auth0Id: string) {
    return this.userRepository.getUserByAuth0Id(auth0Id);
  }

  public async createUser(args: CreateUserInput) {
    return this.userRepository.createUser(args);
  }
}
