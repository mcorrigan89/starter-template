import { Injectable } from '@nestjs/common';
import { CurrentUserService } from './current-user.service';
import { CreateUserInput, UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { z } from 'zod';
import { BadRequestError, NotFoundError } from 'src/errors';

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
    const uuid = z.string().uuid().safeParse(id);
    if (!uuid.success) {
      throw new BadRequestError('Invalid user id');
    }
    const user = await this.userRepository.getUserById(uuid.data);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
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
