import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserType, UserTypeResult } from './user.dto';
import { UserService } from 'src/domain/user/user.service';
import { createPubSub } from 'graphql-yoga';
import { CustomFileScalar } from '../file/file.scalar';

const pubsub = createPubSub<{
  userCreated: [id: string];
}>();

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserTypeResult)
  async user(@Args('id', { type: () => String }) id: string) {
    pubsub.publish('userCreated', id);
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

  @Mutation(() => String)
  async readTextFile(
    @Args('file', { type: () => CustomFileScalar }) file: Blob,
  ) {
    const textContent = await file.text();
    return textContent;
  }

  @Subscription(() => String, {
    resolve(payload) {
      return payload;
    },
  })
  async userCreated() {
    return pubsub.subscribe('userCreated');
  }
}
