import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.dto';
import { UserService } from 'src/domain/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserType)
  async user(@Args('id', { type: () => String }) id: string) {
    return {
      id,
      name: 'John Doe',
    };
  }

  @Query(() => UserType)
  async me() {
    const user = await this.userService.getCurrentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
