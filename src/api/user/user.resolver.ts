import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType, UserTypeResult } from './user.dto';
import { UserService } from 'src/domain/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserTypeResult)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => UserType, { nullable: true })
  async me() {
    const user = await this.userService.getCurrentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
