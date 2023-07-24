import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.dto';

@Resolver()
export class UserResolver {
  @Query(() => UserType)
  async user(@Args('id', { type: () => String }) id: string) {
    return {
      id,
      name: 'John Doe',
    };
  }
}
